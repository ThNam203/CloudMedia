const mongoose = require('mongoose')

const statusCommentSchema = new mongoose.Schema(
    {
        statusPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StatusPost',
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
        },
        mediaFiles: {
            type: [{ type: String }],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('StatusComment', statusCommentSchema)
