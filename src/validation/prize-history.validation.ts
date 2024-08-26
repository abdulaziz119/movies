import * as Joi from "joi";


// export interface PrizeHistoryModel extends BaseModel {
//     prize_id: number,
//     user_id: number,
//     story_ssenariy_id: number,
//     status: PrizeHistoryEnum
// }
const create_joi = Joi.object({
    prize_id: Joi.number().min(1).allow(null),
    user_id: Joi.number().min(1).allow(null),
    story_ssenariy_id: Joi.number().min(1).allow(null),
    status: Joi.number().min(1).allow(null),
}).unknown(true);

const query_params_joi = Joi.object({
    limit: Joi.number().min(5).allow(null),
    page: Joi.number().min(1).allow(null),
    user_id: Joi.number().min(1).allow(null).optional()
}).unknown(true);


export {
    query_params_joi,
    create_joi
}
