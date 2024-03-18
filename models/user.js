const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")


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
    }
}, {versionKey: false})


UserSchema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password, 10)
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