const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router({ mergeParams: true })

router.route('').get(usersController.getUserById)

module.exports = router
