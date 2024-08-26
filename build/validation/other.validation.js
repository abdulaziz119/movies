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
const query_params_joi = Joi.object({
    search: Joi.string().allow(null),
    limit: Joi.number().min(5).allow(null),
    status: Joi.number().min(0).max(10).allow(null),
    page: Joi.number().min(1).allow(null)
}).unknown(true);
exports.query_params_joi = query_params_joi;
const month_params_joi = Joi.object({
    phone: Joi.number().min(1).required(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(5).optional(),
    month: Joi.string().optional()
}).unknown(true);
exports.month_params_joi = month_params_joi;
const params_joi = Joi.object({
    limit: Joi.number().min(5).required(),
    page: Joi.number().min(1).required()
}).unknown(true);
exports.params_joi = params_joi;
const name_joi = Joi.object({
    name: Joi.string().required(),
}).unknown(true);
exports.name_joi = name_joi;
const id_joi = Joi.object({
    id: Joi.number().required()
}).unknown(true);
exports.id_joi = id_joi;
