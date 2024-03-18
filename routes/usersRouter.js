const express = require("express")
const validateBody = require('../helpers/validateBody')
const userSchema = require('../schemas/usersSchema')
const isValidToken = require('../helpers/isValidToken')
// const authenticate = require('../helpers/isValidToken')
const errorWrapper = require('../utils/errorWrapper')
const {
    signup,
    login,
    logout,
    current
} = require('../controllers/usersControllers')

const usersRouter = express.Router()

usersRouter.post('/register', validateBody(userSchema),errorWrapper(signup))
usersRouter.post('/login',validateBody(userSchema),errorWrapper(login))
usersRouter.post('/logout', isValidToken, logout)
usersRouter.get('/current', isValidToken, current)

module.exports = usersRouter