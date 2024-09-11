import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import { id_joi, params_joi} from "../../validation";
import {FrontendAdvertisingController} from "../../controllers";

const validator = createValidator({passError: true});

export const FrontendAdvertisingRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), FrontendAdvertisingController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), FrontendAdvertisingController.getOne);
};
