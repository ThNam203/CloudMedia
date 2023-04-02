require('./utils/startServerScript')

const express = require('express')

const errorHandlers = require('./controllers/errorController')
const authRouter = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use('/', authRouter)

app.use('*', errorHandlers.invalidUrlHandler)
app.use(errorHandlers.globalErrorHandler)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
})
