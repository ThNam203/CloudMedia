const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const socketIO = require('./socket')

const io = socketIO.getIO()

const joinChatRooms = async (userId, socket) => {
    const chatrooms = await ChatRoom.find({ members: { $in: [userId] } })
    chatrooms.forEach((chatroom) => {
        console.log('the user entered ' + chatroom._id.toString())
        socket.join(chatroom._id.toString())
    })
}

io.on('connection', (socket) => {
    joinChatRooms(socket.handshake.auth.userId, socket)

    socket.on('newMessage', async (data) => {
        const { chatRoomId, message, senderId } = data
        const chatRoom = await ChatRoom.findById(chatRoomId)
        if (!chatRoom)
            return socket
                .in(chatRoomId)
                .emit('roomNotFound', 'Unable to find the chat room')

        const newChatMessage = await ChatMessage.create({
            chatRoomId,
            message,
            senderId,
        })

        if (!newChatMessage)
            return socket.emit('messageError', 'Unable to send new message')

        io.in(chatRoomId).emit('newMessage', newChatMessage)
    })
})
