const Joi = require("joi")

const createContactSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    favorite: Joi.boolean()
})
 
const updateContactSchema = Joi.object({
    name: Joi.string().min(7).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(10)
}). min(1)




module.exports = {
    createContactSchema,
    updateContactSchema,
}
