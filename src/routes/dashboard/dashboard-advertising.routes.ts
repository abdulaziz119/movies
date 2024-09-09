import * as express from "express";
import { createValidator } from "express-joi-validation";
import {checkToken} from "../../utils";
import {advertisingSchema, id_joi, params_joi} from "../../validation";
import {DashboardAdvertisingController} from "../../controllers";
const validator = createValidator({ passError: true });

export const DashboardAdvertisingRoutes = (app: express.Application) => {
    app.post('/create', checkToken, validator.body(advertisingSchema), DashboardAdvertisingController.create);
    app.get('/findAll', checkToken, validator.query(params_joi), DashboardAdvertisingController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), DashboardAdvertisingController.getOne);
    app.delete('/delete/:id', checkToken,validator.params(id_joi) , DashboardAdvertisingController.delete);
};
