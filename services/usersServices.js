const UserModel = require('../models/user')

const checkUserEmail = async (email) => {
    const user = await UserModel.findOne({email})
    return user
}

const findById = async (id) => {
    const user = await UserModel.findById(id)
    return user
}

const createUser = async (payload) => {
    const user = new UserModel(payload)
    await user.hashPassword()
    await user.save()
    return user
}


module.exports = {
    checkUserEmail,
    createUser,
    findById
}
