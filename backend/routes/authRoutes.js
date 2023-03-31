const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(authController.signUpAsRecruiter)

//router.route('/login').get(authController.)

module.exports = router
