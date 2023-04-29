const mongoose = require('mongoose')

require('../config/index')

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log(
        `connected to database with path ${process.env.MONGODB_CONNECT}`
    )
})
