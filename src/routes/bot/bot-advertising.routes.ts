import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import { id_joi, params_joi} from "../../validation";
import {BotAdvertisingController} from "../../controllers/bot";

const validator = createValidator({passError: true});

export const BotAdvertisingRoutes = (app: express.Application) => {
    app.get('/findAll', checkToken, validator.query(params_joi), BotAdvertisingController.getAll);
    app.get('/findOne/:id', checkToken, validator.params(id_joi), BotAdvertisingController.getOne);
};
