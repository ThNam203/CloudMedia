const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')

const createNewChatRoom = async (title, chatRoomMembers) => {
    const memberIds = chatRoomMembers.map((user) => user._id)
    const newChatRoom = await ChatRoom.create({ title, memberIds })
    if (!newChatRoom)
        throw new AppError('Unable to create a new chat room, try again', 500)

    chatRoomMembers.forEach((member) => member.chatRooms.push(newChatRoom._id))
    return newChatRoom
}

exports.createNewChatRoom = asyncCatch(async (req, res, next) => {
    const { title, chatRoomMemberIds } = req.body

    let chatRoomMembers
    User.find({ _id: { $in: chatRoomMemberIds } })
        .then((foundUsers) => {
            if (foundUsers.length <= 1)
                return next(
                    new AppError(
                        `All users's id are all invalid, please check again!`,
                        400
                    )
                )

            chatRoomMembers = foundUsers
        })
        .catch((err) => next(err))

    let newChatRoom
    try {
        newChatRoom = createNewChatRoom(title, chatRoomMembers)
    } catch (e) {
        return next(e)
    }

    res.status(200).json({
        status: 'success',
        data: newChatRoom,
    })
})

exports.createNewMessage = asyncCatch(async (req, res, next) => {
    const { chatRoomId, messageData } = req.params
    const chatRoom = await ChatRoom.findById(chatRoomId)
    if (!chatRoom) return next(new AppError('Chat room not found', 400))

    const newMessage = await ChatMessage.create({
        chatRoomId: chatRoom._id,
        message: messageData.message,
        sender: messageData.sender,
    })

    if (!newMessage)
        return next(new AppError('Unable to create new message', 500))

    res.status(200).json({
        status: 'success',
        data: newMessage,
    })
})

exports.getMessagesInChatRoomId = asyncCatch(async (req, res, next) => {
    const { chatRoomId } = req.params
    let { page = 0, limit = 20 } = req.query
    if (page < 0) page = 0
    if (limit < 0) limit = 1
    else if (limit > 100) limit = 100

    const messages = await ChatMessage.find({ chatRoomId: chatRoomId })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)

    res.status(200).json({
        status: 'success',
        data: messages,
    })
})
