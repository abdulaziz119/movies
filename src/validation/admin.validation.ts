import * as Joi from 'joi'

const admin_joi = Joi.object({
    user_id: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    language: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    role_id: Joi.number().required(),
}).unknown(true);


const admin_login_joi = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
}).unknown(true);

export {
    admin_login_joi,
    admin_joi
}