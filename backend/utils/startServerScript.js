const mongoose = require('mongoose')
const User = require('../models/User')

require('../config/index')

mongoose
    .connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log(
            `connected to database with path ${process.env.MONGODB_CONNECT}`
        )

        return User.find({})
    })
    .then((users) => {
        users.forEach((user) => {
            if (!('dateOfBirth' in user)) user.dateOfBirth = null
            if (!('hometown' in user)) user.hometown = null
            if (!('workingPlace' in user)) user.workingPlace = null
            if (!('followers' in user)) user.followers = []
            if (!('followings' in user)) user.followings = []
            user.save()
        })
    })
