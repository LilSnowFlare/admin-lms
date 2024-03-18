const { ErrorHandler } = require("../sharedutils/ErrorHandler")

const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //wrong mongodb id error
    if (err.name == "CastError") {
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //Duplicate key error
    if (err.code == 11000) {
        const message = `Duplicate Key ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    //wrong jwt error
    if (err.name == "jsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    //JWT Expired Error
    if (err.name == "jsonWebTokenError") {
        const message = `Json Web Token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}
module.exports = ErrorMiddleware;