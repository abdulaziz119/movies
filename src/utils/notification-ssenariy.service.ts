// import {ErrorEnum, RolesModel, TYPE_OF_CONDITION_ENUM} from "../models";
// import {NOT_FOUND} from "http-status-codes";
// import {SsenariyRepository} from "../repository";
// import {ValidationException} from "../exceptions/validation.exception";
//
// export class NotificationSsenariyService {
//
//   static async check(req) {
//     if (!req.body.content && !req.body.template_id) {
//       throw new ValidationException(ErrorEnum.templateIdOrContent)
//     }
//
//     let ssenariy: RolesModel = await SsenariyRepository.getById(req.body.ssenariy_id)
//
//     if (!ssenariy) {
//       throw new ValidationException(ErrorEnum.invalidSsenariyId, NOT_FOUND)
//     }
//
//     if (ssenariy.type_of_condition !== TYPE_OF_CONDITION_ENUM.NOTIFICATIONS) {
//       throw new ValidationException(ErrorEnum.ssenariyNotification)
//     }
//   }
// }