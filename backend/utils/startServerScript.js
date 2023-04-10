const mongoose = require('mongoose')

require('../config/index')

if (process.env.NODE_ENV === 'development')
    mongoose.connect(process.env.MONGODB_CONNECT_LOCAL).then(() => {
        console.log('connected to local database')
    })
else
    mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
        console.log('connected to remote database')
    })
