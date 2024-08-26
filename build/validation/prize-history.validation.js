"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
// export interface MoviesModel extends BaseModel {
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
exports.create_joi = create_joi;
const query_params_joi = Joi.object({
    limit: Joi.number().min(5).allow(null),
    page: Joi.number().min(1).allow(null),
    user_id: Joi.number().min(1).allow(null).optional()
}).unknown(true);
exports.query_params_joi = query_params_joi;
