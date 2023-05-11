const express = require('express')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true })

router
    .route('/u/:userEmail')
    .get(authController.isUser, usersController.getUserByEmail)

router
    .route('/:userId')
    .get(usersController.getUserById)
    .patch(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.updateUserById
    )

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

module.exports = router
