const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const crypto = require('crypto')


const UserSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
    avatar: {
        type: String
    }
}, {versionKey: false})


UserSchema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password, 10)

    const emailHash = crypto.createHash('md5').update(this.email).digest('hex')
    this.avatar = `http://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`
}

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.toJSON = function(){
    const obj = this.toObject()
    delete obj.password
    return obj
}


const UserModel = mongoose.model('user', UserSchema)


module.exports = UserModel