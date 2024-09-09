import Joi from 'joi';
import {languageSchema} from "./movie.validation";

export const moviesSchema = Joi.object({
    name: languageSchema.required(),
    movies: Joi.array().required(),
    state: Joi.string().required(),
    genre: Joi.string().required(),
    year: Joi.string().required(),
    create_admin_id: Joi.number().required()
});
