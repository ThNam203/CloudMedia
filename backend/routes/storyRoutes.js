const express = require('express')

const router = express.Router({ mergeParams: true })
const authController = require('../controllers/authController')
const storyController = require('../controllers/storyController')
const s3Controller = require('../controllers/s3Controller')

router
    .route('')
    .get(authController.isUser, storyController.getAllStoryOfAUser)
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        s3Controller.uploadMediaFiles.array('media-files'),
        storyController.createNewStory
    )

router
    .route('/:storyId')
    .patch(authController.isUser, storyController.toggleLikeStory)
    .delete(
        authController.isUser,
        authController.isOwnerOfThePath,
        storyController.deleteStory
    )

module.exports = router
