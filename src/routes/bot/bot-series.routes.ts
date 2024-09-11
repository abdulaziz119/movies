import * as express from "express";
import {createValidator} from "express-joi-validation";
import {id_joi, params_joi, paramsMovies_id_joi} from "../../validation";
import {checkToken} from "../../utils";
import {BotSeriesController} from "../../controllers/bot";

const validator = createValidator({passError: true});

export const BotSeriesRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), BotSeriesController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), BotSeriesController.getOne);
    app.post('/movies', checkToken, validator.body(paramsMovies_id_joi), BotSeriesController.ByMoviesIdGetAll);
};
