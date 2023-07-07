const mongoose = require('mongoose')

require('../config/index')

mongoose.connect(process.env.MONGODB_CONNECT)
