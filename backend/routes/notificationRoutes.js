const express = require('express')
const authController = require('../controllers/authController')
const notificationController = require('../controllers/notificationController')

const router = new express.Router({
    mergeParams: true,
})

router
    .route('')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        notificationController.getAllNotificationsOfAUser
    )
    .patch(
        authController.isUser,
        authController.isOwnerOfThePath,
        notificationController.readAllNotifications
    )

router
    .route('/:notificationId')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        notificationController.getNotificationById
    )

module.exports = router
