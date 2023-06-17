const express = require('express')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')
const s3Controller = require('../controllers/s3Controller')

const router = express.Router({ mergeParams: true })

router
    .route('/u/:userEmail')
    .get(authController.isUser, usersController.getUserByEmail)

router
    .route('/:userId/profile-image')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        s3Controller.uploadMediaFiles.single('profile-image'),
        usersController.updateProfileImage
    )

router
    .route('/:userId/background-image')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        s3Controller.uploadMediaFiles.single('background-image'),
        usersController.updateUserBackground
    )

router
    .route('/:userId/friend')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.getAllFriends
    )

router
    .route('/:userId/chatroom')
    .get(
        authController.isUser,
        authController.isOwnerOfThePath,
        chatController.getAllChatRooms
    )

router
    .route('/:userId')
    .get(usersController.getUserById)
    .put(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.updateUserById
    )

module.exports = router
