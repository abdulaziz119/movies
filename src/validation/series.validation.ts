import Joi from 'joi';
import {languageSchema} from "./movie.validation";

export const moviesSchema = Joi.object({
    name: languageSchema.required(),
    movies: Joi.array().required(),
    state: Joi.string().required(),
    year: Joi.string().required(),
    genre: Joi.string().required(),
    create_admin_id: Joi.number().required(),
    code: Joi.number().required()
});

export const paramsMovies_id_joi = Joi.object({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(5).required(),
    movies_id: Joi.array().required()
}).unknown(true);