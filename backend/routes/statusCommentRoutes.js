const express = require('express')
const statusCommentController = require('../controllers/statusCommentController')
const authController = require('../controllers/authController')
const s3Controller = require('../controllers/s3Controller')

const router = express.Router({
    mergeParams: true,
})

router
    .route('/')
    .get(
        authController.isUser,
        statusCommentController.getAllCommentsOfStatusPost
    )
    .post(
        authController.isUser,
        s3Controller.uploadMediaFiles.single('media-file'),
        statusCommentController.createNewComment
    )

router
    .route('/:commentId')
    .put(authController.isUser, statusCommentController.toggleLikeComment)
    .delete(authController.isUser, statusCommentController.deleteComment)

module.exports = router
