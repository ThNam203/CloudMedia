const RecruiterModel = require('../models/Recruiter')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')
const Recruiter = require('../models/Recruiter')

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

// exports.loginAsRecruiter = asyncCatch(async (req, res, next) => {
//     const { email, password } = req.body
//     if (!email || !password)
//         throw new AppError('Missing email or password', 400)

//     const isExisted = Recruiter.find({ email })
//     if (isExisted)
// })
