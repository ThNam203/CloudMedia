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
        likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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

statusCommentSchema.virtual('likeCount').get(function () {
    return this.likedUsers ? this.likedUsers.length : 0
})

module.exports = mongoose.model('StatusComment', statusCommentSchema)
