import Joi from 'joi';

// Define the schema for permissions
const permissionsSchema = Joi.object({
    create: Joi.boolean().required(),
    update: Joi.boolean().required(),
    delete: Joi.boolean().required()
});

const roles_joi = Joi.object({
    id: Joi.number().integer().required(),  // Assuming `id` is part of BaseModel
    admin: permissionsSchema.required(),
    roles: permissionsSchema.required(),
    movies: permissionsSchema.required(),
    users: permissionsSchema.required(),
    series: permissionsSchema.required(),
    statistics: permissionsSchema.required(),
    advertising: permissionsSchema.required(),
    uploads: permissionsSchema.required()
});
export {
    roles_joi,
}
