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

const sendNotificationOnReply = (receiver, isAccept) => {
    let message
    if (isAccept) message = `${receiver.name} accepted your friend request`
    else message = `${receiver.name} denied your friend request`

    Notification.create({
        userId: receiver._id,
        notificationType: 'FriendRequest',
        title: message,
        content: '',
    })
}

exports.createNewFriendRequest = asyncCatch(async (req, res, next) => {
    const { userId: senderId } = req.params
    const { receiverId } = req.body

    const receiver = await User.findById(receiverId)
    if (!receiver) return next(new AppError(`Invalid receiver's id`, 400))

    const newFriendRequest = await FriendRequest.create({
        senderId,
        receiverId,
    })

    if (!newFriendRequest)
        return next(new AppError('Unable to create new friend request', 500))

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

    const respondent = await User.find(respondentId)

    const friendRequest = await FriendRequest.findByIdAndDelete(friendRequestId)
    if (!friendRequest)
        return next(new AppError(`Invalid friend request's id`, 400))

    const requestSender = await User.findById(friendRequest.senderId)

    if (response === 'Accept') {
        respondent.connections.push(requestSender._id)
        requestSender.connections.push(respondent._id)

        createChatRoomOnAccept(respondent, requestSender)
        sendNotificationOnReply(requestSender, true)

        await Promise.all(respondent.save(), requestSender.save())
    } else sendNotificationOnReply(requestSender, false)

    res.status(204).end()
})
