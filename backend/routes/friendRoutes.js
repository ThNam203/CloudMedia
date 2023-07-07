const express = require('express')
const authController = require('../controllers/authController')
const friendController = require('../controllers/friendController')

const router = new express.Router({
    mergeParams: true,
})

router
    .route('')
    .get(authController.isUser, friendController.getAllFriendOfUser)
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.createNewFriendRequest
    )

router
    .route('/sent')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.getAllSentFriendRequestOfAUser
    )

router
    .route('/received')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.getAllReceivedFriendRequestOfAUser
    )

router
    .route('/received/:requestId')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.replyFriendRequest
    )

module.exports = router
