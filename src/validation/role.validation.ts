import Joi from 'joi';

// Define the schema for permissions
const permissionsSchema = Joi.object({
    create: Joi.boolean().required(),
    getOne: Joi.boolean().required(),
    getAll: Joi.boolean().required(),
    update: Joi.boolean().required(),
    delete: Joi.boolean().required()
});

const roles_joi = Joi.object({
    admin_id: Joi.number().required(),
    admin: permissionsSchema.required(),
    roles: permissionsSchema.required(),
    movies: permissionsSchema.required(),
    series: permissionsSchema.required(),
    statistics: permissionsSchema.required(),
    advertising: permissionsSchema.required(),
    uploads: permissionsSchema.required()
});
export {
    roles_joi,
}
