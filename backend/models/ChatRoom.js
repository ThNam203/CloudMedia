const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
})

module.exports = mongoose.model('ChatRoom', chatRoomSchema)
