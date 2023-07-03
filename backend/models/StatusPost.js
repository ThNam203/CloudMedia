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
        // Todo: remove _id for mediaFiles
        mediaFiles: [
            {
                location: String,
                name: String,
                fileType: String,
            },
        ],
        likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        likeCount: {
            type: Number,
            default: 0,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
        sharedLink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StatusPost',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('StatusPost', statusPostSchema)
