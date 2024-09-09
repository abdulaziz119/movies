import * as express from "express";
import { createValidator } from "express-joi-validation";
import {checkToken} from "../../utils";
import {DashboardAdminController} from "../../controllers";
import {admin_joi, admin_login_joi, id_joi, params_joi} from "../../validation";
const validator = createValidator({ passError: true });

export const DashboardAdminRoutes = (app: express.Application) => {
    app.post('/login', checkToken, validator.body(admin_login_joi), DashboardAdminController.login);
    app.post('/register', checkToken,validator.body(admin_joi) , DashboardAdminController.create);
    app.get('/:id', checkToken,validator.params(id_joi) , DashboardAdminController.getOne);
    app.get('/', checkToken,validator.query(params_joi) , DashboardAdminController.getAll);
    app.delete('/:id', checkToken,validator.params(id_joi) , DashboardAdminController.delete);
};
