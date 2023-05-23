const express = require('express')

const router = express.Router({ mergeParams: true })
const authController = require('../controllers/authController')
const statusPostController = require('../controllers/statusPostController')

router
    .route('')
    .get(authController.isUser, statusPostController.getAllStatusPostsOfAUser)
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        statusPostController.uploadMediaFiles.array('media-files'),
        statusPostController.createNewStatusPost
    )

router
    .route('/:statusPostId')
    .get(authController.isUser, statusPostController.getStatusPostById)
    .patch(
        authController.isUser,
        authController.isOwnerOfThePath,
        statusPostController.updateJobPostById
    )
    .delete(
        authController.isUser,
        authController.isOwnerOfThePath,
        statusPostController.deleteJobPostById
    )

module.exports = router
