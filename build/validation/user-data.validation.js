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
const user_data_joi = Joi.object({
    phone: Joi.number()
        // .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        .required(),
    amount: Joi.number()
        .integer()
        .required()
}).unknown(true);
exports.user_data_joi = user_data_joi;
const getAll_user_data_joi = Joi.object({
    phone: Joi.number()
        // .pattern(/^(\+998|8\-9|998)?\s?(\dxw{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        .required(),
}).unknown(true);
exports.getAll_user_data_joi = getAll_user_data_joi;
const user_data_get_joi = Joi.object({
    phone: Joi.number()
        .required(),
    month: Joi.string().optional(),
    page: Joi.number()
        .min(1).optional(),
    limit: Joi.number()
        .min(5).optional()
}).unknown(true);
exports.user_data_get_joi = user_data_get_joi;
