import Joi from 'joi';

export const advertisingSchema = Joi.object({
    create_admin_id: Joi.number().required(),
    finish: Joi.number().required(),
    upload_id: Joi.number().required()

});
