require('./config/index')
require('./models/Mongoose')

const express = require('express')

const errorHandlers = require('./controllers/errorController')
const authRouter = require('./routes/recruiterAuthRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use('/recruiter', authRouter)

app.use('*', errorHandlers.invalidUrlHandler)
app.use(errorHandlers.globalErrorHandler)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
})
