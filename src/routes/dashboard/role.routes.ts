import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import {DashboardAdminController} from "../../controllers";
import {roles_joi} from "../../validation";

const validator = createValidator({passError: true});

export const DashboardRoleRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(roles_joi), DashboardAdminController.create);
};
