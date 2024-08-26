import * as Joi from 'joi'

const config_joi = Joi.object({
    content: Joi.object({
        visibility: Joi.boolean().required()
    }).optional(),
}).unknown(true);


export {
   config_joi
}
