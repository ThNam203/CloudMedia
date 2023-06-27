const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const socketIO = require('./socket')

const io = socketIO.getIO()

io.use((socket, next) => {
    if (socket.handshake.query) {
        const { callerId } = socket.handshake.query
        socket.user = callerId
        next()
    }
})

io.on('connection', (socket) => {
    socket.join(socket.handshake.auth.userId)

    socket.on('joinRoom', (data) => {
        const chatRoomId = data
        socket.join(chatRoomId)
    })

    socket.on('leaveRoom', (data) => {
        const chatRoomId = data
        socket.leave(chatRoomId)
    })

    socket.on('offerVideoCall', (data) => {
        const { offerDescription, chatRoomId } = data
        socket.to(chatRoomId).emit('offerVideoCall', {
            offerDescription,
        })
    })

    socket.on('answerOfferVideoCall', (data) => {
        const { answerDescription, chatRoomId } = data
        socket.to(chatRoomId).emit('answerOfferVideoCall', answerDescription)
    })

    socket.on('iceCandidate', (data) => {
        const { iceCandidate, chatRoomId } = data
        socket.to(chatRoomId).emit('iceCandidate', iceCandidate)
    })

    // ---------------------------------------------------------------------
    // ---------------------------------------------------------------------
    // ---------------------------------------------------------------------
    // ---------------------------------------------------------------------

    socket.on('call', (data) => {
        const { calleeId, rtcMessage } = data

        socket.to(calleeId).emit('newCall', {
            callerId: socket.user,
            rtcMessage: rtcMessage,
        })
    })

    socket.on('answerCall', (data) => {
        const { callerId, rtcMessage } = data

        socket.to(callerId).emit('callAnswered', {
            callee: socket.user,
            rtcMessage: rtcMessage,
        })
    })

    socket.on('ICEcandidate', (data) => {
        const { calleeId, rtcMessage } = data

        socket.to(calleeId).emit('ICEcandidate', {
            sender: socket.user,
            rtcMessage: rtcMessage,
        })
    })

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

        chatRoom.lastMessage = message
        chatRoom.lastMessageTime = Date.now
        await chatRoom.save()

        io.in(chatRoomId).emit('newMessage', newChatMessage)
    })
})
