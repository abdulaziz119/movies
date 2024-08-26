import * as express from "express";
import { createValidator } from "express-joi-validation";
import {checkToken} from "../../utils";
import {DashboardAdminController} from "../../controllers";
import {admin_joi, admin_login_joi} from "../../validation";
const validator = createValidator({ passError: true });

export const DashboardAdminRoutes = (app: express.Application) => {
    app.post('/login', checkToken, validator.query(admin_login_joi), DashboardAdminController.login);
    app.post('/register', checkToken,validator.query(admin_joi) , DashboardAdminController.create);
};
