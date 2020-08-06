
//npm install @hapi/joi
const Joi = require('@hapi/joi');

module.exports = {
    loginSchema: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    todolistSchema: Joi.object({
        id: Joi.number().integer().min(0), 
        title: Joi.string().required(),
        about: Joi.string().required(),
        guest_user: Joi.string().required(),
        status: Joi.number().required(),
    })
}