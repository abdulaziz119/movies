import * as express from "express";
import { createValidator } from "express-joi-validation";
const validator = createValidator({ passError: true });

export const DashboardAdvertisingRoutes = (app: express.Application) => {
    // app.post('/', checkToken, validator.query(config_joi), MoviesController.update);
    // app.get('/get', checkToken,validator.query(config_joi) , MoviesController.getOne);
};
