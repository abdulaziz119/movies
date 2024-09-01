import * as express from "express";
import {createValidator} from "express-joi-validation";
import { DashboardSeriesController} from "../../controllers";
import {checkToken} from "../../utils";
import {moviesSchema} from "../../validation";
import {id_joi, params_joi} from "../../validation/other.validation";
const validator = createValidator({passError: true});

export const DashboardSeriesRoutes = (app: express.Application) => {
    app.post('/create', checkToken, validator.body(moviesSchema), DashboardSeriesController.create);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), DashboardSeriesController.getOne);
    app.get('/findAll', checkToken, validator.query(params_joi), DashboardSeriesController.getAll);
    app.put('/update/:id', validator.params(id_joi), validator.body(moviesSchema), checkToken, DashboardSeriesController.update);
    app.delete('/delete/:id', checkToken,validator.params(id_joi) , DashboardSeriesController.delete);
};