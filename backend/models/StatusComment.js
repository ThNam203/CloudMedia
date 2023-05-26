const mongoose = require('mongoose')

const statusCommentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        statusPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StatusPost',
            required: true,
        },
        content: String,
        mediaFile: String,
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('StatusComment', statusCommentSchema)
