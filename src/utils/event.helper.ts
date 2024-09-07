// import {HunterProvider} from "../providers/hunter.provider";
//
// export class EventHelper {
//   static async streakRequested(user_id: number, ssenariy_id: number) {
//     await HunterProvider.createUserEvent(user_id, 'streak', 200, 'streak requested', {ssenariy_id: ssenariy_id})
//   }
//
//   static async streakReset(storySsenariy: any) {
//     await HunterProvider.createUserEvent(storySsenariy.user_id, 'streak', 200, 'streak reset', {
//       ssenariy_id: storySsenariy.ssenariy_id,
//       days: storySsenariy.days,
//       date_start: storySsenariy.date_start
//     })
//   }
//
//   static async streakSuccess(storySsenariy: any) {
//     await HunterProvider.createUserEvent(storySsenariy.user_id, 'streak', 200, 'streak success', {
//       ssenariy_id: storySsenariy.ssenariy_id,
//       days: storySsenariy.days,
//       date_start: storySsenariy.date_start
//     })
//   }
// }