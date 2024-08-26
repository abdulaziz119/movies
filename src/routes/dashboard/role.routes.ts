import * as express from "express";
import {createValidator} from "express-joi-validation";
const validator = createValidator({passError: true});

export const DashboardRoleRoutes = (app: express.Application) => {
    // app.get('/', checkToken, validator.query(query_params_joi), StatisticController.getAll);
};
