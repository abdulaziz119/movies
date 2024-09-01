import Joi from 'joi';

export const languageSchema = Joi.object({
    uz: Joi.string().required(),
    ru: Joi.string().optional(),
    en: Joi.string().optional(),
});

export const movieSchema = Joi.object({
    code: Joi.number().integer().required(),
    name: languageSchema.required(),
    url: languageSchema.required(),
    quality: Joi.string().optional(),
    duration: Joi.string().optional(),
    state: Joi.string().optional(),
    year: Joi.string().optional(),
    genre: Joi.string().optional(),
    create_admin_id: Joi.number().integer().required()
});

export const params_query_joi = Joi.object({
    limit: Joi.number().min(5).required(),
    page: Joi.number().min(1).required(),
    query: Joi.string().required()
}).unknown(true);