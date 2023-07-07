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

exports.changePassword = asyncCatch(async (req, res, next) => {
    const { oldPassword, newPassword, email } = req.body

    const updatedUser = await User.findOne({
        email: email,
    }).select('+password')

    if (!updatedUser)
        throw new AppError('Unable to find the user with email', 404)

    if (!updatedUser.checkPassword(oldPassword, updatedUser.password)) {
        return next(new AppError('Password does not match', 500))
    }

    updatedUser.password = newPassword
    updatedUser.markModified('password')
    await updatedUser.save()
    res.status(204).end()
})

exports.getAllFriends = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const userWithFriends = await User.findById(userId).populate({
        path: 'connections',
        select: '_id profileImagePath name backgroundImagePath',
    })

    res.status(200).json(userWithFriends.connections)
})

exports.followUserById = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const { userFollowedId } = req.body
    const user = await User.findById(userId)
    const userFollowed = await User.findById(userFollowedId)

    if (!user) throw new AppError('User not found', 404)
    if (!userFollowed) throw new AppError('User followed not found', 404)
    if (user.followings.includes(userFollowedId))
        throw new AppError('Already followed', 500)

    user.followings.push(userFollowedId)
    userFollowed.followers.push(userId)

    user.markModified('followings')
    userFollowed.markModified('followers')
    await Promise.all([user.save(), userFollowed.save()])

    res.status(204).end()
})

exports.unfollowUserById = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const { userUnfollowedId } = req.body
    const user = await User.findById(userId)
    const userUnfollowed = await User.findById(userUnfollowedId)

    if (!user) throw new AppError('User not found', 404)
    if (!userUnfollowed) throw new AppError('User unfollowed not found', 404)

    const firstIdx = user.followings.indexOf(userUnfollowedId)
    if (firstIdx === -1)
        throw new AppError(
            'Unable to find the unfollowed user in the following list',
            404
        )

    const secondIdx = userUnfollowed.followers.indexOf(userId)
    if (secondIdx === -1)
        throw new AppError(
            'Something went wrong while updating the unfollowed user',
            404
        )

    user.followings.splice(firstIdx, 1)
    userUnfollowed.followers.splice(secondIdx, 1)
    user.markModified('followings')
    userUnfollowed.markModified('followers')

    await Promise.all([user.save(), userUnfollowed.save()])

    res.status(204).end()
})
