const express = require('express')
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')

const router = express.Router({
    mergeParams: true,
})

router.route('/').post(chatController.checkAndCreateNewChatRoom)
router
    .route('/:chatRoomId')
    .get(authController.isUser, chatController.getMessagesInChatRoomId)

module.exports = router
