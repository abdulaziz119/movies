import * as express from "express";
import {PrizeHistoryController} from "../../controllers/dashboard/prize-history.controller";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils";
import {query_params_joi,create_joi}from "../../validation/prize-history.validation"
const validator = createValidator({passError: true});

export const DashboardPrizeHistoryRoutes = (app: express.Application) => {
    app.get('/', checkToken, validator.query(query_params_joi), PrizeHistoryController.getAll);
};
