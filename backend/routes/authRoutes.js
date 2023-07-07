const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/usersController')

const router = express.Router()

router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.logIn)
router.route('/logout').post(authController.logOut)
router.route('/validate-jwt').get(authController.validateJwt)
router.route('/change-password').post(userController.changePassword)
router.route('/reset-password').post(authController.createForgetPasswordRequest)
router
    .route('/reset-password/:resetPasswordRequestId')
    .get(authController.resetPassword)

module.exports = router
