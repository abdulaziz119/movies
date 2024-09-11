import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import {getFilteredMoviesWithPagination_joi, id_joi, params_joi} from "../../validation";
import {BotMoviesController} from "../../controllers/bot";

const validator = createValidator({passError: true});

export const BotMoviesRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), BotMoviesController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), BotMoviesController.getOne);
    app.get('/get-filter', checkToken, validator.query(getFilteredMoviesWithPagination_joi), BotMoviesController.getFilteredMoviesWithPagination);
    app.get('/genre-get-all', BotMoviesController.genreGetAll);
};
