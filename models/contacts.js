const mongoose = require("mongoose")

const Schema = mongoose.Schema

const mongooseSchema = new Schema ({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'UserModel',
        }
},{versionKey: false})
const Contacts = mongoose.model('contacts', mongooseSchema)
module.exports = Contacts