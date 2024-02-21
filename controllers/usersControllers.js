const HttpError = require('../helpers/HttpError')
const {
    checkUserEmail, 
    createUser,
    findById
} = require('../services/usersServices')

const singup = async (req, res, next) => {
    try {
        const {password, email} = req.body
        const user = await checkUserEmail(email)

        if(user){
            throw new HttpError(409, 'Email in use')
        }

        const newUser = await createUser({...req.body})

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const {password, email} = req.body
        const user = await checkUserEmail(email)
        if(!user){
            throw new HttpError(401, 'Email or password is wrong')
        }
        const arePasswordEquals = await user.comparePassword(password)
        if(!arePasswordEquals){
            throw new HttpError(401, 'Email or password is wrong')
        }
        res.status(201).json(user)
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const user = await findById(req.user._id)

        if (!user) {
            throw new HttpError(401, 'Unauthorized');
        }

        user.token = ''
        await user.save()
        res.status(200).json({ message: 'Successfully logged out' })
        next()
    } catch (error) {
        next(error)
    }
}

const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({email, subscription});
}

module.exports = {
    singup,
    login,
    logout,
    current
}