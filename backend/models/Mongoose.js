const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log('connected to database')
})
