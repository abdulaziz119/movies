import * as express from "express";
import { createValidator } from "express-joi-validation";
import {checkToken} from "../../utils";
import {DashboardAdminController} from "../../controllers";
import {admin_joi, admin_login_joi} from "../../validation";
import Joi from "joi";
import {params_joi} from "../../validation/other.validation";
const validator = createValidator({ passError: true });

export const DashboardAdminRoutes = (app: express.Application) => {
    app.post('/login', checkToken, validator.body(admin_login_joi), DashboardAdminController.login);
    app.post('/register', checkToken,validator.body(admin_joi) , DashboardAdminController.create);
    app.get('/:id', checkToken,validator.params(Joi.object({id: Joi.number().required()})) , DashboardAdminController.getOne);
    app.get('/', checkToken,validator.params(params_joi) , DashboardAdminController.getAll);
};
