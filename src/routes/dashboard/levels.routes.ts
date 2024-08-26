import {LevelsController} from "../../controllers/dashboard/levels.controller";
import * as express from "express";
import {createValidator} from "express-joi-validation";
import {checkToken, id_joi, levels_joi, params_joi} from "../../index";

const validator = createValidator({passError: true});

export const LevelRoutes = (app: express.Application) => {
    app.post('/', checkToken, validator.body(levels_joi), LevelsController.create);
    app.get('/', checkToken, validator.query(params_joi), LevelsController.getAll);
    app.get('/:id', checkToken, validator.params(id_joi), LevelsController.getOne);
    app.put('/:id', validator.params(id_joi), validator.body(levels_joi), checkToken, LevelsController.update);
    app.delete('/:id', validator.params(id_joi), checkToken, LevelsController.delete);
};