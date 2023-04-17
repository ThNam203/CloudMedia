const express = require('express')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true })

router
    .route('')
    .get(usersController.getUserById)
    .patch(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.updateUserById
    )

router
    .route('/profile-image')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        usersController.uploadProfileImage.single('profile-image'),
        usersController.updateProfileImage
    )

module.exports = router
