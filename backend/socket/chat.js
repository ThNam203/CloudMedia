const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const socketIO = require('./socket')

const io = socketIO.getIO()

io.on('connection', (socket) => {
    socket.on('newMessage', async (data) => {
        const { chatRoomId, message, sender } = data
        const chatRoom = await ChatRoom.findById(chatRoomId)
        if (!chatRoom)
            return socket
                .in(chatRoomId)
                .emit('roomNotFound', 'Unable to find the chat room')

        const newChatMessage = await ChatMessage.create({
            chatRoomId,
            message,
            sender,
        })

        if (!newChatMessage)
            return socket.emit('messageError', 'Unable to send new message')

        socket.in(chatRoomId).emit('newMessage', newChatMessage)
    })
})
