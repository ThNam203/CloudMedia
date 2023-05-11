const express = require('express')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')

const router = express.Router({ mergeParams: true })

router
    .route('/u/:userEmail')
    .get(authController.isUser, usersController.getUserByEmail)

router
    .route('/:userId/profile-image')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.uploadProfileImage.single('profile-image'),
        usersController.updateProfileImage
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
