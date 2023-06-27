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
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
)

statusPostSchema.virtual('likeCount').get(function () {
    return this.likedUsers ? this.likedUsers.length : 0
})

module.exports = mongoose.model('StatusPost', statusPostSchema)
