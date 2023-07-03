/* eslint-disable no-plusplus */
const ChatRoom = require('../models/ChatRoom')
const FriendRequest = require('../models/FriendRequest')
const Notification = require('../models/Notification')
const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')

const socketIO = require('../socket/socket')

const createChatRoomOnAccept = async (firstUser, secondUser) => {
    const newChatRoom = await ChatRoom.create({
        members: [firstUser._id, secondUser._id],
    })

    if (newChatRoom) {
        firstUser.chatRooms.push(newChatRoom._id)
        secondUser.chatRooms.push(newChatRoom._id)
    }
}

const sendNotificationOnReply = async (sender, receiver, isAccept) => {
    let message
    if (isAccept) message = `${receiver.name} accepted your friend request`
    else message = `${receiver.name} denied your friend request`

    const noti = await Notification.create({
        userId: sender._id,
        sender: receiver._id,
        notificationType: 'FriendRequest',
        content: message,
    })

    const io = socketIO.getIO()
    if (noti) io.in(sender._id.toString()).emit('newNotification', noti)
}

const sendNotificationOnRequest = async (senderId, receiverId) => {
    const sender = await User.findById(senderId)
    const content = `${sender.name} has sent you a friend request`

    const noti = await Notification.create({
        userId: receiverId,
        sender: sender._id,
        notificationType: 'FriendRequest',
        content,
    })

    const io = socketIO.getIO()
    if (noti) io.in(senderId.toString()).emit('newNotification', noti)
}

const updateFollow = (requestSender, respondent) => {
    if (requestSender.followings.indexOf(respondent._id) === -1) {
        requestSender.followings.push(respondent._id)
        requestSender.followers.push(respondent._id)
    }

    if (respondent.followings.indexOf(requestSender._id) === -1) {
        respondent.followings.push(requestSender._id)
        respondent.followers.push(requestSender._id)
    }
}

exports.createNewFriendRequest = asyncCatch(async (req, res, next) => {
    const { userId: senderId } = req.params
    const { receiverEmail } = req.body

    const receiver = await User.findOne({ email: receiverEmail })

    // check if you are you
    if (!receiver) return next(new AppError(`Email not found`, 400))
    if (receiver._id === senderId)
        return next(new AppError('Unable to add yourself', 400))

    // check if friend request is pending
    const isExisted = await FriendRequest.findOne({
        senderId: { $in: [receiver._id, senderId] },
        receiverId: { $in: [receiver._id, senderId] },
    })

    if (isExisted) return next(new AppError('The request is already sent', 400))

    // check if already been friend
    if (receiver.connections.includes(senderId))
        return next(new AppError('Already friend', 400))

    // create the request in db
    const newFriendRequest = await FriendRequest.create({
        senderId,
        receiverId: receiver._id,
    })

    if (!newFriendRequest)
        return next(new AppError('Unable to create new friend request', 500))

    sendNotificationOnRequest(senderId, receiver._id)

    res.status(200).json(newFriendRequest)
})

exports.getAllSentFriendRequestOfAUser = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const sentFriendRequests = await FriendRequest.find({ senderId: userId })
    res.status(200).json(sentFriendRequests)
})

exports.getAllReceivedFriendRequestOfAUser = asyncCatch(
    async (req, res, next) => {
        const { userId } = req.params
        const receivedFriendRequests = await FriendRequest.find({
            receiverId: userId,
        })
        res.status(200).json(receivedFriendRequests)
    }
)

exports.replyFriendRequest = asyncCatch(async (req, res, next) => {
    const { requestId: friendRequestId, userId: respondentId } = req.params
    const { response } = req.body

    const respondent = await User.findById(respondentId)

    // check if the respone is correct
    if (response !== 'Accept' && response !== 'Decline')
        return next(new AppError('False response format', 400))

    // delete the friend request
    const friendRequest = await FriendRequest.findByIdAndDelete(friendRequestId)
    if (!friendRequest)
        return next(new AppError('Invalid friend request id', 400))

    const requestSender = await User.findById(friendRequest.senderId)

    if (response === 'Accept') {
        respondent.connections.push(requestSender._id)
        requestSender.connections.push(respondent._id)

        createChatRoomOnAccept(respondent, requestSender)
        sendNotificationOnReply(requestSender, respondent, true)
        updateFollow(requestSender, respondent)

        await Promise.all([respondent.save(), requestSender.save()])
    } else if (response === 'Decline')
        sendNotificationOnReply(requestSender, false)

    res.status(204).end()
})

exports.unfriend = asyncCatch(async (req, res, next) => {
    const { userId, unfriendUserId } = req.params

    const user = await User.findById(userId)
    const unfriendUser = await User.findById(unfriendUserId)

    const firstIdx = user.connections.indexOf(unfriendUserId)
    const secondIdx = unfriendUser.connections.indexOf(userId)

    if (firstIdx === -1) throw new AppError('User not found', 404)
    if (secondIdx === -1) throw new AppError('User unfriended not found', 404)

    user.connections.splice(firstIdx, 1)
    unfriendUser.connections.splice(secondIdx, 1)

    await Promise.all([unfriendUser.save(), user.save()])

    res.status(204).end()
})

exports.recommendFriends = asyncCatch(async (req, res, next) => {
    // Find the user by ID and populate their connections
    const { userId } = req.params
    const user = await User.findById(userId)

    if (!user) throw new AppError('User not found', 404)

    const potentialFriends = await User.aggregate([
        {
            $match: {
                _id: { $nin: user.connections, $ne: user._id }, // Exclude existing connections and the user itself
            },
        },
        {
            $lookup: {
                from: 'FriendRequest',
                let: { userId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$receiverId', '$$userId'] }, // Match receiverId with the current user's ID
                                    { $ne: ['$senderId', '$$userId'] }, // Exclude friend requests sent by the current user
                                ],
                            },
                        },
                    },
                ],
                as: 'friendRequests',
            },
        },
        {
            $match: {
                friendRequests: { $size: 0 }, // Exclude potential friends who have received friend requests
            },
        },
        {
            $sample: { size: 20 },
        },
    ])

    console.log(potentialFriends)

    res.status(200).json(potentialFriends)
})
