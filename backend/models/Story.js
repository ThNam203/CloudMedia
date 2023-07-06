const mongoose = require('mongoose')

const statusPostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mediaFiles: [
            {
                location: String,
                name: String,
                fileType: String,
            },
            {
                _id: false,
            },
        ],
        likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Story', statusPostSchema)
