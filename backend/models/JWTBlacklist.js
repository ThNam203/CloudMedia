const mongoose = require('mongoose')

const JWTBlacklistSchema = new mongoose.Schema({
    jwtData: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('JWTBlacklist', JWTBlacklistSchema)
