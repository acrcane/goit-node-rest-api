const Joi = require("joi")

const updateContactSchema = Joi.object({
    name: Joi.string().min(7).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(10)
}).or('name', 'email', 'phone')

const createContactSchema = Joi.object({
    name: Joi.string().min(7).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required()

})

module.exports = {
    createContactSchema,
    updateContactSchema
}
