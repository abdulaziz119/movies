import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken} from "../../utils/check-token.service";
import {story_ssenariy_joi, story_ssenariy_update_joi, story_ssenariy_user_id_joi} from "../../validation";
import {SsenariyController} from "../../controllers/dashboard/story-ssenariy.controller";

const validator = createValidator({ passError: true });

export const StoryDashboardSsenariyRouetes = (app: express.Application) => {
    app.get('/:user_id', checkToken, validator.params(story_ssenariy_joi), SsenariyController.getById);
  app.post('/', checkToken, validator.body(story_ssenariy_update_joi), SsenariyController.update);
  app.delete('/', checkToken, validator.query(story_ssenariy_user_id_joi), SsenariyController.delete)
};
