import * as Joi from 'joi'

const levels_joi = Joi.object({
    name: Joi.object({
        ru: Joi.string().required(),
        uz: Joi.string().required(),
        en: Joi.string().required()
    }).required(),
    position: Joi.number().required(),
    limit: Joi.number().required(),
    prize_id: Joi.number().required(),
    ssenariy_id: Joi.number().required(),
}).unknown(true);

export {
    levels_joi
}