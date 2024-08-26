import * as express from "express";
import { createValidator } from "express-joi-validation";
import {ConfigController} from "../../controllers/dashboard/config.controller";
import {checkToken} from "../../utils";
import {config_joi} from "../../validation";
const validator = createValidator({ passError: true });

export const ConfigRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.query(config_joi), ConfigController.update);
    app.get('/get', checkToken,validator.query(config_joi) , ConfigController.getOne);
};
