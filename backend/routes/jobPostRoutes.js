const express = require('express')

const router = new express.Router({ mergeParams: true })
const authController = require('../controllers/authController')
const userJobPostController = require('../controllers/userJobPostController')

router
    .route('')
    .get(authController.isUser, userJobPostController.getAllJobPostsOfAUser)
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        userJobPostController.createNewJobPost
    )

router
    .route('/:job_post_id')
    .patch(
        authController.isUser,
        authController.isOwnerOfThePath,
        userJobPostController.updateJobPostById
    )
    .delete(
        authController.isUser,
        authController.isOwnerOfThePath,
        userJobPostController.deleteJobPostById
    )

module.exports = router
