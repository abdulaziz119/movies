import * as express from "express";
import {createValidator} from "express-joi-validation";
import {FrontendSeriesController} from "../../controllers";
import {id_joi, params_joi} from "../../validation";
import {checkToken} from "../../utils";

const validator = createValidator({passError: true});

export const FrontendSeriesRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), FrontendSeriesController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), FrontendSeriesController.getOne);
};
