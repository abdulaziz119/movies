import * as express from "express";
import { createValidator } from "express-joi-validation";
import { checkToken, id_joi, query_params_joi, notificaition_ssenariy_joi, NotificaitionSsenariyController } from "..";
const validator = createValidator({ passError: true });

export const NotificaitionSsenariyRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(notificaition_ssenariy_joi), NotificaitionSsenariyController.create);
    app.get('/', checkToken, validator.query(query_params_joi), NotificaitionSsenariyController.getAll);
    app.get('/:id', checkToken, validator.params(id_joi), NotificaitionSsenariyController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(notificaition_ssenariy_joi), checkToken, NotificaitionSsenariyController.update);
    app.delete('/:id', validator.params(id_joi), checkToken, NotificaitionSsenariyController.delete);
};
