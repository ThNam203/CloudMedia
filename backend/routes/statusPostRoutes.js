const express = require('express')

const router = express.Router({ mergeParams: true })
const authController = require('../controllers/authController')
const statusPostController = require('../controllers/statusPostController')
const s3Controller = require('../controllers/s3Controller')

router
    .route('')
    .get(authController.isUser, statusPostController.getAllStatusPostsOfAUser)
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        s3Controller.uploadMediaFiles.array('media-files'),
        statusPostController.createNewStatusPost
    )

router
    .route('/:statusPostId')
    .patch(authController.isUser, statusPostController.toggleLikeStatusPost)
    .put(
        authController.isUser,
        authController.isOwnerOfThePath,
        statusPostController.updateStatusPostById
    )
    .delete(
        authController.isUser,
        authController.isOwnerOfThePath,
        statusPostController.deleteStatusPostById
    )

module.exports = router
