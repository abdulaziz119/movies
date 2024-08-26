import * as Joi from 'joi'

const admin_joi = Joi.object({
    email: Joi.number().required(),
    password: Joi.string().min(8).required(),
    language: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    role_id: Joi.string().required(),
}).unknown(true);


const admin_login_joi = Joi.object({
    email: Joi.number().required(),
    password: Joi.string().min(8).required(),
}).unknown(true);

export {
    admin_login_joi,
    admin_joi
}