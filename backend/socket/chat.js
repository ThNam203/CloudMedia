const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User')
const socketIO = require('./socket')

const io = socketIO.getIO()
console.debug = () => {}

const onlineUsers = []

io.use((socket, next) => {
    if (socket.handshake.query) {
        const { callerId } = socket.handshake.query
        socket.user = callerId
        next()
    }
})

io.on('connection', (socket) => {
    socket.join(socket.handshake.auth.userId)
    onlineUsers.push(socket.handshake.auth.userId)

    socket.on('disconnect', () => {
        const idx = onlineUsers.indexOf(socket.handshake.auth.userId)
        onlineUsers.splice(idx, 1)
    })

    socket.on('joinRoom', (data) => {
        const { chatRoomId } = data
        socket.join(chatRoomId)
    })

    socket.on('leaveRoom', (data) => {
        const { chatRoomId } = data
        socket.leave(chatRoomId)
    })

    socket.on('callDenied', (data) => {
        const { chatRoomId } = data
        io.in(chatRoomId).emit('callDenied')
    })

    socket.on('offerVideoCall', async (data) => {
        const { offerDescription, chatRoomId, callerId, isVoiceCall } = data
        const user = await User.findById(callerId)
        const offer = JSON.stringify({
            chatRoomId: chatRoomId,
            offerDescription: offerDescription,
            callerName: user.name,
            callerImagePath: user.profileImagePath,
            callerId: callerId,
            isVoiceCall: isVoiceCall,
        })

        const chatRoom = await ChatRoom.findById(chatRoomId)
        let isAllOffline = true
        chatRoom.members.forEach((memberId) => {
            if (memberId.toString() !== callerId) {
                if (onlineUsers.includes(memberId.toString())) {
                    io.in(memberId.toString()).emit('offerVideoCall', offer)
                    isAllOffline = false
                }
            }
        })

        if (isAllOffline) io.in(callerId).emit('noOneInRoom', {})

        // socket.to(chatRoomId).emit('offerVideoCall', offer)
    })

    socket.on('answerOfferVideoCall', async (data) => {
        const { answerDescription, chatRoomId } = data
        const chatRoom = await ChatRoom.findById(chatRoomId)
        chatRoom.members.forEach((memberId) => {
            io.in(memberId.toString()).emit(
                'answerOfferVideoCall',
                answerDescription
            )
        })
        // socket.to(chatRoomId).emit('answerOfferVideoCall', sdp)
    })

    socket.on('iceCandidate', async (data) => {
        const chatRoom = await ChatRoom.findById(data.chatRoomId)
        chatRoom.members.forEach((memberId) => {
            if (memberId.toString() !== data.userId)
                io.in(memberId.toString()).emit(
                    'iceCandidate',
                    data.iceCandidate
                )
        })
        // socket.to(data.chatRoomId).emit('iceCandidate', data)
    })

    socket.on('newMessage', async (data) => {
        const { chatRoomId, message, senderId, imageLink } = data
        const chatRoom = await ChatRoom.findById(chatRoomId)
        if (!chatRoom)
            return socket
                .in(chatRoomId)
                .emit('roomNotFound', 'Unable to find the chat room')

        const newChatMessage = await ChatMessage.create({
            chatRoomId,
            message,
            imageLink,
            senderId,
        })

        if (!newChatMessage)
            return socket.emit('messageError', 'Unable to send new message')

        chatRoom.lastMessage = message
        chatRoom.lastMessageTime = Date.now()
        chatRoom.save()

        socket.to(chatRoomId).emit('newMessage', newChatMessage)
    })
})
