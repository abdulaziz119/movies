import * as express from "express";
import {createValidator} from "express-joi-validation";

const validator = createValidator({passError: true});

export const FrontendSeriesRoutes = (app: express.Application) => {
    // app.post('/', checkToken, validator.body(levels_joi), RoleController.create);
    // app.get('/', checkToken, validator.query(params_joi), RoleController.getAll);
    // app.get('/:id', checkToken, validator.params(id_joi), RoleController.getOne);
    // app.put('/:id', validator.params(id_joi), validator.body(levels_joi), checkToken, RoleController.update);
    // app.delete('/:id', validator.params(id_joi), checkToken, RoleController.delete);
};
