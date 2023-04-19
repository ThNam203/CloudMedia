require('./utils/startServerScript')

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const errorHandlers = require('./controllers/errorController/errorController')
const authRouter = require('./routes/authRoutes')
const usersRouter = require('./routes/usersRoutes')
const jobPostRouter = require('./routes/jobPostRoutes')
const userJobPostController = require('./controllers/userJobPostController')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log(`a user connected with id ${socket.id}`)

    socket.on('clientSendMessage', (newMessage) => {
        io.emit('serverSendMessage', newMessage)
    })
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use('/', authRouter)
app.get('/jobpost/:jobPostId', userJobPostController.getAJobPostUsingItsId)
app.use('/:user_id/jobpost', jobPostRouter)
app.use('/:user_id', usersRouter)

app.use('*', errorHandlers.invalidUrlHandler)
app.use(errorHandlers.globalErrorHandler)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`)
})

module.exports = http
