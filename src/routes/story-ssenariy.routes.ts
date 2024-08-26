import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "..";
import {StorySsenariyController} from "../controllers";
import {story_ssenariy_joi} from "../validation";

const validator = createValidator({ passError: true });

export const StorySsenariyRouetes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(story_ssenariy_joi), StorySsenariyController.create);
};
