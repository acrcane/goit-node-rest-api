const HttpError = require('../helpers/HttpError')
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = process.env
const {
    checkUserEmail, 
    createUser,
    findById,
} = require('../services/usersServices')




const signup = async (req, res) => {
    const {password, email, subscription} = req.body
            const user = await checkUserEmail(email)
        if (user) {
            throw HttpError(409, "This email is already in use")
        }
        const newUser = await createUser(req.body)
        res.status(201).json({user: {email: newUser.email, subscription: newUser.subscription}})
  };

const login = async (req, res) => {
        const {password, email} = req.body
        const user = await checkUserEmail(email)
        if(!user){
            throw HttpError(401, 'Email or password is wrong')
        }
        const arePasswordEquals = await user.comparePassword(password)
        if(!arePasswordEquals){
            throw HttpError(401, 'Email or password is wrong')
        }
        const token = jwt.sign({userId: user._id}, JWT_SECRET)
        user.token = token
        await user.save()
        console.log(user.token);
        res.status(200).json({token, user: {emai: user.email, subscription: user.subscription}})
}

const logout = async (req, res) => {

        const user = await findById(req.user._id)

        if (!user) {
            throw HttpError(401, 'Unauthorized');
        }

        user.token = ''
        await user.save()
        res.status(204).json()

}

const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({email, subscription});
}


module.exports = {
    signup,
    login,
    logout,
    current
}