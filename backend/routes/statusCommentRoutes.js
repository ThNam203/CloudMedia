const express = require('express')
const statusCommentController = require('../controllers/statusCommentController')
const authController = require('../controllers/authController')

const router = express.Router({
    mergeParams: true,
})

router
    .route('')
    .get(
        authController.isUser,
        statusCommentController.getAllCommentsOfStatusPost
    )
    .post(
        authController.isUser,
        statusCommentController.uploadMediaFile.single('media-file'),
        statusCommentController.createNewComment
    )

router
    .route('/:commentId')
    .get(authController.isUser, statusCommentController.getCommentById)

module.exports = router
