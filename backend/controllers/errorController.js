const AppError = require('../utils/AppError')

exports.globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    res.status(statusCode).json({
        status: 'error',
        message,
    })
}

exports.invalidUrlHandler = (req, res, next) => {
    next(new AppError('Invalid request url', 404))
}
