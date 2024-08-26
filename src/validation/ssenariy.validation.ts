import * as Joi from 'joi'
import {getEnumValues} from "../utils";
import {TYPE_OF_CONDITION_ENUM} from "../models";

const types = getEnumValues(TYPE_OF_CONDITION_ENUM)

const ssenariy_joi = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    type_of_condition: Joi.number().valid(...types).required(),
    days: Joi.number().required(),
    prize_id: Joi.number().optional().allow(null),
    position: Joi.number().optional().allow(null)
}).unknown(true);


export {
    ssenariy_joi
}
