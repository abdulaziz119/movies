import * as Joi from 'joi';

const user_data_joi = Joi.object({
    phone: Joi.number()
        // .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        .required(),
    amount: Joi.number()
        .integer()
        .required()
}).unknown(true);

const getAll_user_data_joi = Joi.object({
    phone: Joi.number()
        // .pattern(/^(\+998|8\-9|998)?\s?(\dxw{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        .required(),
}).unknown(true);

const user_data_get_joi = Joi.object({
    phone: Joi.number()
        .required(),
    month: Joi.string().optional(),
    page: Joi.number()
        .min(1).optional(),
    limit: Joi.number()
        .min(5).optional()
}).unknown(true);


export {
    getAll_user_data_joi,
    user_data_get_joi,
    user_data_joi
}
