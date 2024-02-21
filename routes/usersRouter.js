const express = require("express")
const validateBody = require('../helpers/validateBody')
const userSchema = require('../schemas/usersSchema')
const isValidToken = require('../helpers/isValidToken')
const {
    singup,
    login,
    logout,
    current
} = require('../controllers/usersControllers')

const usersRouter = express.Router()

usersRouter.post('/register', validateBody(userSchema),singup)
usersRouter.post('/login', isValidToken, validateBody(userSchema),login)
usersRouter.post('/logout', isValidToken, logout)
usersRouter.get('/current', isValidToken, current)

module.exports = usersRouter