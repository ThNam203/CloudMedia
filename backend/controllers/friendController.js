/* eslint-disable no-plusplus */
const ChatRoom = require('../models/ChatRoom')
const FriendRequest = require('../models/FriendRequest')
const Notification = require('../models/Notification')
const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')

const createChatRoomOnAccept = async (firstUser, secondUser) => {
    const newChatRoom = await ChatRoom.create({
        members: [firstUser._id, secondUser._id],
    })

    if (newChatRoom) {
        firstUser.chatRooms.push(newChatRoom._id)
        secondUser.chatRooms.push(newChatRoom._id)
    }
}

const sendNotificationOnReply = (sender, receiver, isAccept) => {
    let message
    if (isAccept) message = `${receiver.name} accepted your friend request`
    else message = `${receiver.name} denied your friend request`

    Notification.create({
        userId: sender._id,
        notificationType: 'FriendRequest',
        content: message,
    })
}

const sendNotificationOnRequest = async (senderId, receiverId) => {
    const sender = await User.findById(senderId)
    const content = `${sender.name} has sent you a friend request`

    Notification.create({
        userId: receiverId,
        notificationType: 'FriendRequest',
        content,
    })
}

exports.createNewFriendRequest = asyncCatch(async (req, res, next) => {
    const { userId: senderId } = req.params
    const { receiverEmail } = req.body

    const receiver = await User.findOne({ email: receiverEmail })
    if (!receiver) return next(new AppError(`Email not found`, 400))
    if (receiver._id === senderId)
        return next(new AppError('Unable to add friend to yourself', 400))

    // check if friend request is pending
    const isExisted = await FriendRequest.findOne({
        senderId,
        receiverId: receiver._id,
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

        await Promise.all([respondent.save(), requestSender.save()])
    } else if (response === 'Decline')
        sendNotificationOnReply(requestSender, false)

    res.status(204).end()
})
