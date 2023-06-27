const User = require('../models/User')
const asyncCatch = require('../utils/asyncCatch')
const AppError = require('../utils/AppError')
const s3Controller = require('./s3Controller')

exports.updateProfileImage = asyncCatch(async (req, res, next) => {
    if (!req.file || !req.file.location)
        return next(new AppError('Unable to upload profile image', 500))

    const { userId } = req.params
    const user = await User.findById(userId)
    if (user.profileImagePath)
        s3Controller.deleteMediaFile(user.profileImagePath)

    user.profileImagePath = req.file.location
    await user.save()

    res.status(200).json({ imagePath: req.file.location })
})

exports.updateUserBackground = asyncCatch(async (req, res, next) => {
    if (!req.file || !req.file.location)
        return next(new AppError('Unable to upload background image', 500))

    const { userId } = req.params
    const user = await User.findById(userId)
    if (user.backgroundImagePath)
        s3Controller.deleteMediaFile(user.backgroundImagePath)

    user.backgroundImagePath = req.file.location
    await user.save()

    res.status(200).json({ backgroundImagePath: req.file.location })
})

exports.getUserById = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) return next(new AppError('No user found!', 400))

    res.status(200).json(user)
})

exports.getUserByEmail = asyncCatch(async (req, res, next) => {
    const { userEmail } = req.params
    const user = await User.findOne({ email: userEmail })
    if (!user) return next(new AppError('No email found!', 400))

    res.status(200).json(user)
})

exports.updateUserById = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updatedUser) return next(new AppError('No user found!', 400))

    res.status(200).json(updatedUser)
})

exports.getAllFriends = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const userWithFriends = await User.findById(userId).populate({
        path: 'connections',
        select: '_id profileImagePath name backgroundImagePath',
    })

    res.status(200).json(userWithFriends.connections)
})
