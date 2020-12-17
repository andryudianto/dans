module.exports = function errorHandler(err, req, res, next) {
    let statusCode = 500
    let message = "Internal Server Error!"
    console.log(err)
    switch (err.message) {
        case "wrong email / password":
            statusCode = 400
            message = err.message
            break;
        case "SequelizeUniqueConstraintError":
            statusCode: 400
            message: err.message
        default:
            statusCode
            message
            break;
    }
    res.status(statusCode).json(message)
}