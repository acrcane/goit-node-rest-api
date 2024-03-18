const jwt = require("jsonwebtoken")
const HttpError =require('./HttpError')
const UserModel = require('../models/user')
const dotenv = require('dotenv')
dotenv.config()
const {JWT_SECRET} = process.env

const authenticate = async (req, res, next) => {

    try {
        const { authorization = "" } = req.headers;

        if (typeof authorization !== "string") {
            throw HttpError(401, "Not authorized 1")
        }
    
        const [bearer, token] = authorization.split(" ", 2);
    
        if (bearer !== "Bearer") {
            throw HttpError(401, "Not authorized 2")
        }
        const { userId } = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(userId);

        // if (!user || !token || user.token !== token) {
        //     throw HttpError(401, "Not authorized 3")
        // }

        req.user = user;
        next();
    } catch (error) {
        const err = HttpError(401, 'Not authorized 4')
        next(err)
    }
};

module.exports = authenticate;