import * as Joi from 'joi'

const notificaition_ssenariy_joi = Joi.object({
    ssenariy_id: Joi.number().required(),
    content: Joi.object({
        ru: Joi.string().required(),
        uz: Joi.string().required(),
        en: Joi.string().required()
    }).optional(),
    template_id: Joi.number().allow(null).optional(),
    day: Joi.number().required()
}).unknown(true);

export {
    notificaition_ssenariy_joi
}
