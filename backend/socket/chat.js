const ChatMessage = require('../models/ChatMessage')
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User')
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

    socket.on('offerVideoCall', async (data) => {
        console.log('offerVideoCall')
        console.log(data)
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
        chatRoom.members.forEach((memberId) => {
            if (memberId.toString() !== callerId) {
                console.log(memberId)
                console.log(offer)
                io.in(memberId.toString()).emit('offerVideoCall', offer)
            }
        })

        // socket.to(chatRoomId).emit('offerVideoCall', offer)
    })

    socket.on('answerOfferVideoCall', async (data) => {
        console.log('answerOfferVideoCall')
        console.log(data)
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
        console.log('iceCandidate')
        console.log(data)
        const chatRoom = await ChatRoom.findById(data.chatRoomId)
        chatRoom.members.forEach((memberId) => {
            io.in(memberId.toString()).emit('iceCandidate', data)
        })
        // socket.to(data.chatRoomId).emit('iceCandidate', data)
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
