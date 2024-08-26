import * as express from "express";
import { createValidator } from "express-joi-validation";
import { checkToken, id_joi, query_params_joi, ssenariy_joi, SsenariyController } from "..";
const validator = createValidator({ passError: true });

export const SsenariyRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(ssenariy_joi), SsenariyController.create);
    app.get('/', checkToken, validator.query(query_params_joi), SsenariyController.getAll);
    app.get('/:id', checkToken, validator.params(id_joi), SsenariyController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(ssenariy_joi), checkToken, SsenariyController.update);
    app.delete('/:id', validator.params(id_joi), checkToken, SsenariyController.delete);
};
