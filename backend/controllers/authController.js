const jwt = require('jsonwebtoken')

const User = require('../models/User')
const JWTBlacklist = require('../models/JWTBlacklist')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')

const getJWTToken = function (userEmail) {
    return jwt.sign({ email: userEmail }, process.env.JWT_SECRET, {
        expiresIn: '7 days',
    })
}

exports.signUp = asyncCatch(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isRecruiter: req.body.isRecruiter,
        phoneNumber: req.body.phoneNumber,
        createdDate: req.body.createdDate,
    })

    res.status(200).json({
        status: 'success',
        data: `created a new user with email ${newUser.email}`,
    })
})

exports.logIn = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password)
        next(new AppError('Missing email or password', 400))

    const freshUser = await User.findOne({ email }).select('+password')
    if (!freshUser) next(new AppError('Email not found', 400))

    if (!(await freshUser.checkPassword(password, freshUser.password)))
        next(new AppError('Wrong password', 400))

    const jwtToken = getJWTToken(freshUser.email)
    res.status(200).json({
        status: 'success',
        data: {
            jwtToken: jwtToken,
        },
    })
})

exports.logOut = asyncCatch(async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        const token = req.headers.authorization.split(' ')[1]

        const freshToken = await JWTBlacklist.findOne({ jwtData: token })

        if (freshToken)
            return next(
                new AppError(
                    'Invalid request! Already logged out the user with this token',
                    400
                )
            )

        await JWTBlacklist.create({ jwtData: token })

        res.status(200).json({
            status: 'success',
            data: {
                message: `Logout successfully`,
            },
        })
    } else return next(new AppError('Missing or invalid authorization header', 400))
})
