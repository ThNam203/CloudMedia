const mongoose = require('mongoose')

const JWTBlacklistSchema = new mongoose.Schema(
    {
        jwtData: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            expires: 60 * 60 * 24 * 90,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

JWTBlacklistSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 * 90 }
)

module.exports = mongoose.model('JWTBlacklist', JWTBlacklistSchema)
