const User = require('../models/User')
const asyncCatch = require('../utils/asyncCatch')
const AppError = require('../utils/AppError')

exports.getUserById = asyncCatch(async (req, res, next) => {
    const { user_id: userId } = req.params
    const user = await User.findById(userId)
    if (!user) return next(new AppError('No user found!', 400))

    res.status(200).json({
        status: 'success',
        data: user,
    })
})
