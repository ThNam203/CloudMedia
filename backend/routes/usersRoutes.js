const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.route('/:id').get(usersController.getUserById)

module.exports = router
