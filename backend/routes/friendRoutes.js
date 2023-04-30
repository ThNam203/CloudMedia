const express = require('express')
const authController = require('../controllers/authController')
const friendController = require('../controllers/friendController')

const router = new express.Router({
    mergeParams: true,
})

router
    .route('/:userId/friend-request')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.createNewFriendRequest
    )

router
    .route('/:userId/friend-request/sent')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.getAllSentFriendRequestOfAUser
    )

router
    .route('/:userId/friend-request/received')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.getAllReceivedFriendRequestOfAUser
    )

router
    .route('/:userId/friend-request/received/:requestId')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        friendController.replyFriendRequest
    )

module.exports = router
