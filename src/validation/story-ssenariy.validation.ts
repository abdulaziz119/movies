import Joi from "joi";

const story_ssenariy_joi = Joi.object({
  user_id: Joi.number().required(),
}).unknown(true)
const story_ssenariy_user_id_joi = Joi.object({
  user_id: Joi.number().required(),
}).unknown(true)

const story_ssenariy_update_joi = Joi.object({
  user_id: Joi.number().required(),
  ssenariy_id: Joi.number().required(),
  date_start: Joi.date().allow('+', '-', '').required(),
  completed_at: Joi.date().allow('+', '-', '').required(),
}).unknown(true)

export {
  story_ssenariy_joi,
  story_ssenariy_update_joi,
  story_ssenariy_user_id_joi
}