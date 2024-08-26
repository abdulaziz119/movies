import * as express from "express";
import {createValidator} from "express-joi-validation";
import {UserDataController} from "../../controllers/user-data.controller";
import {checkToken, getAll_user_data_joi} from "../../index";

const validator = createValidator({passError: true});

export const FrontendUserDataRoutes = (app: express.Application) => {
    app.get('/user-data', checkToken, validator.query(getAll_user_data_joi), UserDataController.getRelevantData);
};