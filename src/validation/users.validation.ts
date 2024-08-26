import * as Joi from 'joi'

const users_joi = Joi.object({
    user_id: Joi.number().required(),
    language: Joi.string().required(),
    activate_date: Joi.string().required(),
}).unknown(true);


export {
    users_joi
}
