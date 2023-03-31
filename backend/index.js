require('./config/index')
require('./models/Mongoose')

const express = require('express')

const AppError = require('./utils/AppError')
const authRouter = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use('', authRouter)

app.use('*', (req, res, next) => {
    next(new AppError('Invalid request url', 404))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        status: 'error',
        message,
    })
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
})
