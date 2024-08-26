import {UserDataController} from "../../controllers/user-data.controller";
import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken, user_data_get_joi, user_data_joi} from "../../index";

const validator = createValidator({passError: true});

export const UserDataRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(user_data_joi), UserDataController.packageAssigned);
    app.get('/', checkToken, validator.query(user_data_get_joi), UserDataController.getUserData);
};