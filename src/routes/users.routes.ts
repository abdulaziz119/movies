import * as express from "express";
import { createValidator } from "express-joi-validation";
import { checkToken, id_joi, query_params_joi, users_joi, UsersController } from "..";
const validator = createValidator({ passError: true });

export const UsersRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(users_joi), UsersController.create);
    app.get('/', checkToken, validator.query(query_params_joi), UsersController.getAll);
    app.get('/:id', checkToken, validator.params(id_joi), UsersController.getById);
    app.delete('/:id', validator.params(id_joi), checkToken, UsersController.delete);
};
