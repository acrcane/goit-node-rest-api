const HttpError = require("./HttpError")

const handleError = (error, req, res, next) => {
    if(error instanceof HttpError) {
        res.status(error.statusCode).json({message: error.message})
    } else {
        res.status(500).json({message: 'Something wrong'})
    }
}


module.exports = handleError