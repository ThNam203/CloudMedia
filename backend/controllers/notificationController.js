const asyncCatch = require('../utils/asyncCatch')
const Notification = require('../models/Notification')
const AppError = require('../utils/AppError')
const User = require('../models/User')

exports.newNotification = asyncCatch(async (req, res, next) => {
    res.status(500).json('NOT IMPLEMENTED')
    // const newNotification = await Notification.createNewNotification(req)
    // if (!newNotification)
    //     return next(new AppError('Unable to create new notification', 500))

    // res.status(204).end()
})

exports.readAllNotifications = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const notifications = await Notification.find({ userId: userId })
    notifications.forEach((noti) => {
        noti.isRead = true
        noti.save()
    })
    res.status(204).end()
})

exports.getAllNotificationsOfAUser = asyncCatch(async (req, res, next) => {
    const { userId } = req.params
    const notifications = await Notification.find({ userId: userId })
        .populate('userId', '_id profileImagePath')
        .populate('sender', '_id name profileImagePath')
    res.status(200).json(notifications)
})

exports.getNotificationById = asyncCatch(async (req, res, next) => {
    const { notificationId } = req.params
    const notification = await Notification.findById(notificationId)
    if (!notification)
        return next(new AppError('Unable to find the notification', 400))
    res.status(200).json(notification)
})
