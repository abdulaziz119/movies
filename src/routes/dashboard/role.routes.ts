import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import {roles_joi} from "../../validation";
import { DashboardRoleController} from "../../controllers";
import Joi from "joi";
import {params_joi} from "../../validation/other.validation";

const validator = createValidator({passError: true});

export const DashboardRoleRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(roles_joi), DashboardRoleController.create);
    app.get('/:id', checkToken,validator.params(Joi.object({id: Joi.number().required()})) , DashboardRoleController.getOne);
    app.get('/', checkToken,validator.query(params_joi) , DashboardRoleController.getAll);
    app.delete('/:id', checkToken,validator.params(Joi.object({id: Joi.number().required()})) , DashboardRoleController.delete);
};
