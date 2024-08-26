import Joi from "joi";
import {PrizeTypeEnum} from "../models";

const types: any[] = []

for (let property of Object.values(PrizeTypeEnum)) {
  if (Number(property) >= 0) {
    types.push(property)
  }
}

const prize_save_joi = Joi.object({
  name: Joi.object({
    ru: Joi.string().required(),
    uz: Joi.string().required(),
    en: Joi.string().required()
  }).required(),
  type: Joi.number().valid(...types).required(),
  value: Joi.any().required()
}).unknown(true)

export {
  prize_save_joi
}