import * as express from "express";
import {createValidator} from "express-joi-validation";
import {DashboardAdminController, DashboardMoviesController} from "../../controllers";
import {checkToken} from "../../utils";
import {movieSchema, params_query_joi} from "../../validation";
import {id_joi, params_joi} from "../../validation/other.validation";
const validator = createValidator({passError: true});

export const DashboardMoviesRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(movieSchema), DashboardMoviesController.create);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), DashboardMoviesController.getOne);
    app.get('/findAll', checkToken, validator.query(params_joi), DashboardMoviesController.getAll);
    app.get('/query', checkToken, validator.query(params_query_joi), DashboardMoviesController.queryGet);
    app.delete('/delete/:id', checkToken,validator.params(id_joi) , DashboardMoviesController.delete);
};


