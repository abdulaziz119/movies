import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import {getFilteredMoviesWithPagination_joi, id_joi, params_joi} from "../../validation";
import { FrontendMoviesController} from "../../controllers";

const validator = createValidator({passError: true});

export const FrontendMoviesRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), FrontendMoviesController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), FrontendMoviesController.getOne);
    app.get('/get-filter', checkToken, validator.query(getFilteredMoviesWithPagination_joi), FrontendMoviesController.getFilteredMoviesWithPagination);
    app.get('/genre-get-all', FrontendMoviesController.genreGetAll);
};
