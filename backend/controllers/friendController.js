const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')
const AppError = require('../utils/AppError')
const asyncCatch = require('../utils/asyncCatch')

exports.createNewFriendRequest = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const { receiverId } = req.body

    const receiver = await User.findById(receiverId)
    if (!receiver) return next(new AppError(`Invalid receiver's id`, 400))

    const newFriendRequest = await FriendRequest.create({
        senderId: userId,
        receiverId: receiverId,
    })

    if (!newFriendRequest)
        return next(new AppError('Unable to create new friend request', 500))

    res.status(200).json({
        status: 'success',
        data: newFriendRequest,
    })
})

exports.replyFriendRequest = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const { response, friendRequestId } = req.body

    const friendRequest = await FriendRequest.findByIdAndDelete(friendRequestId)
    if (!friendRequest)
        return next(new AppError(`Invalid friend request's id`, 400))

    if (response === 'Accept') {
        const user = await User.findById(userId)
        const sender = await User.findById(friendRequest.senderId)
        user.connections.push(sender._id)
        sender.connections.push(userId)
        await Promise.all(user.save(), sender.save())

        res.status(200).json({
            status: 'success',
            message: 'Successfully accept the friend request',
        })
    }
})
