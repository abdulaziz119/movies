import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "..";
import {StorySsenariyController} from "../controllers/frontend/story-ssenariy.controller";
import Joi from "joi";

const validator = createValidator({passError: true});

export const FrontendStorySsenariyRouetes = (app: express.Application) => {
  app.get('/', checkToken, validator.query(Joi.object({user_id: Joi.number().required()})), StorySsenariyController.getOne);
};
