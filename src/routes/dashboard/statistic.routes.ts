import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import { DashboardStatisticController} from "../../controllers";
import {id_joi, params_joi} from "../../validation";

const validator = createValidator({ passError: true });

export const DashboardStatisticRoutes = (app: express.Application) => {
    app.get('/findOne/:id', checkToken, validator.params(id_joi), DashboardStatisticController.getOne);
    app.get('/findAll', checkToken, validator.query(params_joi), DashboardStatisticController.getAll);
    app.delete('/delete/:id', checkToken,validator.params(id_joi) , DashboardStatisticController.delete);
};
