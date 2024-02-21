const jwt = require("jsonwebtoken")
const HttpError =require('./HttpError')
const User = require('../models/user')
const dotenv = require('dotenv')
dotenv.config()
const {JWT_SECRET} = process.env

const authenticate = async (req, res, next) => {

    try {
        const { authorization = "" } = req.headers;

        if (typeof authorization !== "string") {
            throw new HttpError(401, "Not authorized")
        }
    
        const [bearer, token] = authorization.split(" ", 2);
    
        if (bearer !== "Bearer") {
            throw new HttpError(401, "Not authorized")
        }
        const { id } = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(id);

        if (!user || !token || user.token !== token) {
            throw new HttpError(401, "Not authorized")
        }

        req.user = user;
        next();
    } catch (error) {
        const err = new HttpError(401, 'Not authorized')
        next(err)
    }
};

module.exports = authenticate;