const mongoose = require('mongoose')
const User = require('../models/User')
const StatusPost = require('../models/StatusPost')

require('../config/index')

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log(
        `connected to database with path ${process.env.MONGODB_CONNECT}`
    )

    return User.find({})
})
