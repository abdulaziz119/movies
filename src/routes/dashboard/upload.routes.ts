import * as express from "express";
import {createValidator} from "express-joi-validation";

const validator = createValidator({passError: true});

export const DashboardUploadRoutes = (app: express.Application) => {
    // app.post('/', checkToken, validator.body(user_data_joi), UserDataController.packageAssigned);
    // app.get('/', checkToken, validator.query(user_data_get_joi), UserDataController.getUserData);
};