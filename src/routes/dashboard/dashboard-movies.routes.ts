import * as express from "express";
import {createValidator} from "express-joi-validation";
import {DashboardMoviesController, FrontendMoviesController} from "../../controllers";
import {checkToken} from "../../utils";
import {id_joi, movieSchema, params_joi, params_query_joi} from "../../validation";
const validator = createValidator({passError: true});

export const DashboardMoviesRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(movieSchema), DashboardMoviesController.create);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), DashboardMoviesController.getOne);
    app.get('/findAll', checkToken, validator.query(params_joi), DashboardMoviesController.getAll);
    app.get('/query', checkToken, validator.query(params_query_joi), DashboardMoviesController.queryGet);
    app.delete('/delete/:id', checkToken,validator.params(id_joi) , DashboardMoviesController.delete);
    app.get('/genre-get-all', DashboardMoviesController.genreGetAll);
};