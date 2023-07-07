const mongoose = require('mongoose')

const resetPasswordRequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    'RequestPasswordRequest',
    resetPasswordRequestSchema
)
