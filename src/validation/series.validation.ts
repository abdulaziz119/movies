import Joi from 'joi';
import {languageSchema} from "./movie.validation";

export const moviesSchema = Joi.object({
    name: languageSchema.required(),
    movies: Joi.array().required(),
    create_admin_id: Joi.number().required()
});
