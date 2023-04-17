const express = require('express')
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')

const router = new express.Router()
router
    .route('/')
    .post(
        authController.isUser,
        authController.isOwnerOfThePath,
        chatController.createNewChatRoom
    )

module.exports = router
