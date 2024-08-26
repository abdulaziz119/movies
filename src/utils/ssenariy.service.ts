// import {PrizeRepository, SsenariyRepository} from "../repository";
// import {ErrorEnum, SsenariyWithRelationModel} from "../models";
// import {NotFoundException} from "../exceptions/not-found.exception";
//
// export class SsenariyService {
//   static async getSsenariyWithRelations(ssenariy_id: number): Promise<SsenariyWithRelationModel> {
//     const s = await SsenariyRepository.getById(ssenariy_id)
//
//     if (!s) {
//       throw new NotFoundException(ErrorEnum.invalidSsenariyId)
//     }
//
//     return {
//       ...s,
//       prize: await PrizeRepository.getOne(s.prize_id ?? 0)
//     }
//   }
// }