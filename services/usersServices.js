const UserModel = require('../models/user')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const {JWT_SECRET} = process.env

const checkUserEmail = async (email) => {
    const user = await UserModel.findOne({email})
    return user
}

const findById = async (id) => {
    const user = await UserModel.findById(id)
    return user
}

const createUser = async (payload) => {
    const user = new UserModel({...payload})
    await user.hashPassword()
    await user.save()

    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET)

    const newUser = await UserModel.findByIdAndUpdate(user._id, {token}, {new: true})

    return newUser
}

module.exports = {
    checkUserEmail,
    createUser,
    findById
}