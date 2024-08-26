import * as express from "express";
import {createValidator} from "express-joi-validation";
import {month_params_joi} from "../../validation";
import {checkToken} from "../../utils";
import {UserLevelsController} from "../../controllers/user-levels.controller";

const validator = createValidator({passError: true});

export const UsersLevelRoutes = (app: express.Application) => {
    app.get('/', checkToken, validator.query(month_params_joi), UserLevelsController.getLevelsByUserLevels);
};
