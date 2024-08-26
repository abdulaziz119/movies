import * as express from "express";
import { createValidator } from "express-joi-validation";
// import {MoviesController} from "../../controllers/dashboard/movies.controller";
import {checkToken} from "../../utils";
import {config_joi} from "../../validation";
const validator = createValidator({ passError: true });

export const DashboardAdminRoutes = (app: express.Application) => {
    // app.post('/', checkToken, validator.query(config_joi), MoviesController.update);
    // app.get('/get', checkToken,validator.query(config_joi) , MoviesController.getOne);
};
