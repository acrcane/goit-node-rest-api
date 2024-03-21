const mongoose = require("mongoose")
const HttpError = require('./HttpError')

const validId = (req, res, next) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw HttpError(400, 'ID is not valid')
    }
    next()
}

module.exports = validId