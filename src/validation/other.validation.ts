import * as Joi from 'joi'

const query_params_joi = Joi.object({
    search: Joi.string().allow(null),
    limit: Joi.number().min(5).allow(null),
    status: Joi.number().min(0).max(10).allow(null),
    page: Joi.number().min(1).allow(null)
}).unknown(true);

const month_params_joi = Joi.object({
    phone: Joi.number().min(1).required(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(5).optional(),
    month: Joi.string().optional()
}).unknown(true);

const params_joi = Joi.object({
    limit: Joi.number().min(5).required(),
    page: Joi.number().min(1).required()
}).unknown(true);

const name_joi = Joi.object({
    name: Joi.string().required(),
}).unknown(true);

const id_joi = Joi.object({
    id: Joi.number().required()
}).unknown(true);

export {
    month_params_joi,
    params_joi,
    query_params_joi,
    name_joi,
    id_joi
}
