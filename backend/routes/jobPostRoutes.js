const express = require('express')

const router = new express.Router({ mergeParams: true })
const authController = require('../controllers/authController')
const userJobPostController = require('../controllers/userJobPostController')

router
    .route('')
    .get(authController.isUser, userJobPostController.getAllJobPosts)
    .post(
        authController.isUser,
        userJobPostController.isOwner,
        userJobPostController.createNewJobPost
    )

router
    .route('/:job_post_id')
    .patch(
        authController.isUser,
        userJobPostController.isOwner,
        userJobPostController.updateJobPostById
    )
    .delete(
        authController.isUser,
        userJobPostController.isOwner,
        userJobPostController.deleteJobPostById
    )

module.exports = router
