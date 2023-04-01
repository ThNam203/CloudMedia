const jwt = require('jsonwebtoken')
const RecruiterModel = require('../models/Recruiter')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const Recruiter = require('../models/Recruiter')

const getJWTToken = function (userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7 days',
    })
}

exports.signUpAsRecruiter = asyncCatch(async (req, res, next) => {
    const newRecruiter = await RecruiterModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    res.status(404).json({
        status: 'success',
        data: `created a new user with id ${newRecruiter._id}`,
    })
})

exports.logInAsRecruiter = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password)
        throw new AppError('Missing email or password', 400)

    const freshUser = await Recruiter.findOne({ email }).select('+password')
    if (!freshUser) throw new AppError('Email not found', 400)

    if (!(await freshUser.checkPassword(password, freshUser.password)))
        throw new AppError('Wrong password', 400)

    const jwtToken = getJWTToken(freshUser.id)
    res.status(200).json({
        status: 'success',
        data: {
            jwtToken: jwtToken,
        },
    })
})
