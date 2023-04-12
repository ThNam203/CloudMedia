const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')

const companySchema = new mongoose.Schema(
    {
        logoUrl: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            min: [1, 'Company name must not be empty'],
            required: true,
            trim: true,
        },
        linkToWebsite: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false,
    }
)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Missing name property'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Missing email property'],
        unique: true,
        index: true,
        validator: [validator.isEmail, 'Email is invalid'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Missing password property'],
        min: [8, 'Password length must be longer or equal to 8 characters'],
        select: false,
    },
    phoneNumber: {
        type: String,
        min: [10, 'Phone number must be longer or equal to 10 digits'],
        trim: true,
    },
    profileImagePath: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    company: companySchema,
    connections: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    userRole: {
        type: String,
        enum: ['Hiring', 'Open For Work', 'Being Idle'],
        default: 'Being Idle',
        trim: true,
    },
    jobPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' }],
    },
    socialPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SocialPost' }],
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    lastPasswordChangedTime: {
        type: Date,
        select: false,
    },
})

userSchema.statics.createNewUser = function (req) {
    return this.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profileImagePath: req.body.profileImagePath,
        location: req.body.location,
        company: req.body.company,
        connections: req.body.connections,
        userRole: req.body.userRole,
        jobPosts: req.body.jobPosts,
        socialPosts: req.body.socialPosts,
        createdDate: req.body.createdDate,
    })
}

userSchema.methods.checkPassword = async function (
    comingPassword,
    realPassword
) {
    return await bcrypt.compare(comingPassword, realPassword)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    if (this.password.length < 8)
        throw new AppError(
            'Password length must be longer than 8 characters',
            400
        )

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('User', userSchema)
