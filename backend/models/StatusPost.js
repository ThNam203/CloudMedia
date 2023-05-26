const mongoose = require('mongoose')

const statusPostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: {
            type: String,
        },
        mediaFiles: {
            type: [{ type: String }],
        },
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('StatusPost', statusPostSchema)
