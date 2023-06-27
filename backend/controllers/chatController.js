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

exports.checkAndCreateNewChatRoom = asyncCatch(async (req, res, next) => {
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

    res.status(200).json(newChatRoom)
})

exports.getAllChatRooms = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    let chatrooms
    try {
        chatrooms = await ChatRoom.find({
            members: { $in: [userId] },
        }).populate('members', '_id name profileImagePath')
    } catch (err) {
        return next(err)
    }

    res.status(200).json(chatrooms)
})

exports.getMessagesInChatRoomId = asyncCatch(async (req, res, next) => {
    const { chatRoomId } = req.params
    // let { page = 0, limit = 20 } = req.query
    // if (page < 0) page = 0
    // if (limit < 0) limit = 1
    // else if (limit > 100) limit = 100

    // const messages = await ChatMessage.find({ chatRoomId })
    //     .sort({ createdAt: -1 })
    //     .skip(page * limit)
    //     .limit(limit)

    const messages = await ChatMessage.find({ chatRoomId }).sort({
        createdAt: -1,
    })

    const reverseMessages = messages.reverse()

    res.status(200).json(reverseMessages)
})
