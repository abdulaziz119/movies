import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken, config_joi} from "..";
import {ConfigController} from "../controllers/frontend/config.controller";

const validator = createValidator({passError: true});
export const FrontendConfigRoutes = (app: express.Application) => {
    app.get('/', checkToken, validator.query(config_joi), ConfigController.getOne);
};
