import * as express from 'express'
import {createValidator} from "express-joi-validation";
import {id_joi, params_joi, prize_save_joi, PrizeController} from "..";

const validator = createValidator({ passError: true });

export const PrizeRoutes = (app: express.Application) => {
  app.get('/', validator.query(params_joi), PrizeController.getAll)
  app.get('/:id', validator.params(id_joi), PrizeController.getOne)
  app.post('/', validator.body(prize_save_joi), PrizeController.create)
  app.put('/:id', validator.params(id_joi), validator.body(prize_save_joi), PrizeController.update)
  app.delete('/:id', validator.params(id_joi), PrizeController.delete)
}
