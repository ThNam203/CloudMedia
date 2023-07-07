/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const User = require('../models/User')
const JWTBlacklist = require('../models/JWTBlacklist')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const RequestPasswordRequest = require('../models/ResetPasswordRequest')
const ResetPasswordRequest = require('../models/ResetPasswordRequest')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
})

const sendMailForPasswordChangeRequest = (
    toEmail,
    changePasswordRequestId
) => {}

const getJWTToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30 days',
    })

const verifyAndGetJWTToken = async (req, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
    )
        return next(new AppError('Missing authorization header', 401))

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return next(new AppError('Missing JWT token', 401))

    const freshToken = await JWTBlacklist.findOne({ jwtData: token })
    if (freshToken)
        return next(
            new AppError('Invalid request, this token is already revoked', 401)
        )

    jwt.verify(token, process.env.JWT_SECRET)
    return token
}

exports.signUp = asyncCatch(async (req, res, next) => {
    const newUser = await User.createNewUser(req)
    if (!newUser) return next(new AppError('Unable to create new user', 500))
    res.status(204).end()
})

exports.logIn = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password)
        return next(new AppError('Missing email or password', 400))

    const freshUser = await User.findOne({ email }).select('+password')
    if (!freshUser)
        return next(
            new AppError('Invalid username or password. Please try again', 404)
        )

    if (!(await freshUser.checkPassword(password, freshUser.password)))
        return next(
            new AppError('Invalid username or password. Please try again', 404)
        )

    const jwtToken = getJWTToken(freshUser.id)
    res.status(200).json(jwtToken)
})

exports.isUser = asyncCatch(async (req, res, next) => {
    next()
    // const token = await verifyAndGetJWTToken(req, next)
    // if (!token) return next(new AppError('Invalid JWT', 401))

    // const data = jwt.decode(token)
    // const userId = data.id
    // const user = await User.findById(userId)
    // if (!user) return next(new AppError('Invalid JWT', 401))
    // next()
})

// check if :user_id is the same as the jwt token
exports.isOwnerOfThePath = asyncCatch(async (req, res, next) => {
    next()
    // const jwtToken = req.headers.authorization.split(' ')[1]
    // const { id: userId } = jwt.decode(jwtToken)
    // const { userId: idParam } = req.params
    // if (userId !== idParam)
    //     return next(
    //         new AppError(
    //             `Authorization header and user's id is not match together`,
    //             400
    //         )
    //     )

    // next()
})

exports.logOut = asyncCatch(async (req, res, next) => {
    const token = await verifyAndGetJWTToken(req, next)

    const jwtBlacklist = await JWTBlacklist.create({ jwtData: token })
    if (!jwtBlacklist)
        return next(new AppError('Unable to logout, try again', 500))

    res.status(204).json()
})

exports.validateJwt = asyncCatch(async (req, res, next) => {
    try {
        await verifyAndGetJWTToken(req, next)
    } catch (error) {
        return next(error)
    }

    res.status(204).json()
})

// exports.changePassword = asyncCatch(async (req, res, next) => {
//     const token = verifyAndGetJWTToken(req, next)
//     const oldPassword = req.body.oldPassword

// })

exports.createForgetPasswordRequest = asyncCatch(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new AppError('Unable to find the user', 404)

    const resetPasswordRequest = await ResetPasswordRequest.create({
        userId: user._id,
    })

    let baseUrl
    if (process.env.NODE_ENV === 'development')
        baseUrl = 'http://10.0.140.194:3000'
    else baseUrl = 'https://workwize.azurewebsites.net'

    const mailOptions = {
        from: process.env.NODE_MAILER_USER,
        to: email,
        subject: 'Cloud Media Forget Password',
        text: 'You have requested a password reset. If it was you, then click the link below to receive another email with your reset password.',
        html:
            '<p>You have requested a password reset. If it was you, then click the link below to receive another email with your reset password:</p>' +
            '<a href="' +
            baseUrl +
            '/reset-password/' +
            resetPasswordRequest._id +
            '">Reset Password</a>',
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new AppError('Unable to send email', 500)
        } else {
            res.status(204).end()
        }
    })
})

exports.resetPassword = asyncCatch(async (req, res, next) => {
    const { resetPasswordRequestId } = req.params
    const request = await RequestPasswordRequest.findById(
        resetPasswordRequestId
    )

    if (!request) throw new AppError('Unable to find the request', 404)
    const user = await User.findById(request.userId).select('+password')
    if (!user)
        throw new AppError('Unable to find the user with this request', 404)

    let randomPassword = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 8) {
        randomPassword += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }

    user.password = randomPassword
    user.markModified('password')
    await user.save()

    const mailOptions = {
        from: process.env.NODE_MAILER_USER,
        to: request.email,
        subject: 'Cloud Media Reset Password',
        text:
            'You have reset your password, your new password is ' +
            randomPassword,
        html:
            '<p>You have reset your password, your new password is ' +
            randomPassword +
            '</p>',
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(JSON.stringify(error))
            throw new AppError('Unable to send email', 500)
        } else {
            res.status(200).json(
                'Your password has been reset, please check your email'
            )
        }
    })
})
