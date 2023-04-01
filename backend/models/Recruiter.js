const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Missing name property'],
    },
    email: {
        type: String,
        required: [true, 'Missing email property'],
        unique: true,
        validator: [validator.isEmail, 'Email is invalid'],
    },
    password: {
        type: String,
        required: [true, 'Missing password property'],
        min: [8, 'Password length must be longer than 8 characters'],
        select: false,
    },
    lastPasswordChangedTime: {
        type: Date,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
})

recruiterSchema.methods.checkPassword = async function (
    comingPassword,
    realPassword
) {
    return await bcrypt.compare(comingPassword, realPassword)
}

recruiterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    if (this.password.length < 8)
        throw new AppError(
            'Password length must be longer than 8 characters kekw',
            400
        )

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('Recruiter', recruiterSchema)
