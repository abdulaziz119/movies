// import {StorySsenariyWithRelationModel, UserModel} from "../models";
// import {SmsProvider} from "../providers/sms.provider";
// import {NotificationTemplateId, SmsTemplateName} from "../config";
// import {NotificationProvider} from "../providers/notification.provider";
//
// export async function sendAssignPrizeNotification(user: UserModel, storySsenariy: StorySsenariyWithRelationModel) {
//   await SmsProvider.sendMessage(user.phone, user.language, SmsTemplateName, [
//     storySsenariy.ssenariy.prize.name[user.language],
//     storySsenariy.ssenariy.days
//   ])
//   await NotificationProvider.send(user.id, NotificationTemplateId,[
//     storySsenariy.ssenariy.prize.name[user.language],
//     storySsenariy.ssenariy.days
//   ])
// }
