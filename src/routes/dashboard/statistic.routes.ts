import * as express from "express";
import {createValidator} from "express-joi-validation";

const validator = createValidator({ passError: true });

export const DashboardStatisticRoutes = (app: express.Application) => {
  //   app.get('/:user_id', checkToken, validator.params(story_ssenariy_joi), SsenariyController.getById);
  // app.post('/', checkToken, validator.body(story_ssenariy_update_joi), SsenariyController.update);
  // app.delete('/', checkToken, validator.query(story_ssenariy_user_id_joi), SsenariyController.delete)
};
