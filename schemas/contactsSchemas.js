const Joi = require("joi")

const createContactSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    
})
 
const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).allow(''),
    email: Joi.string().email().allow(''),
    phone: Joi.string().min(10).allow('')
}).or('name', 'email', 'phone')

const updateStatusSchema = Joi.object({
    favorite: Joi.boolean().required()
}).min(1)


module.exports = {
    createContactSchema,
    updateContactSchema,
    updateStatusSchema
}
