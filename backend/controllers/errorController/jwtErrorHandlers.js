const AppError = require('../../utils/AppError')

module.exports = class JWTErrorHandler {
    static tokenExpiredErrorHandler() {
        return new AppError('Token is expired, please re-authenticate!', 401)
    }

    static jsonWebTokenErrorHandler() {
        return new AppError('Invalid JWT token', 401)
    }

    static notBeforeErrorHandler() {
        return new AppError('Token is not ready for authentication', 401)
    }
}

// module.exports = function checkForJWTErrors(err) {
//     if (err.name === 'TokenExpiredError')
//         return JWTErrorHandler.tokenExpiredErrorHandler(err)
//     if (err.name === 'JsonWebTokenError')
//         return JWTErrorHandler.jsonWebTokenErrorHandler(err)
//     if (err.name === 'NotBeforeError')
//         return JWTErrorHandler.notBeforeErrorHandler(err)
// }
