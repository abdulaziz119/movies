import {DashboardAdminController} from "./admin.controller";

export class DashboardStatisticController {
  // static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
  //   try {
  //     let data = await PrizeHistoryRepository.getAll(req.query);
  //     if (!data[0]) return res.send(null);
  //
  //     if (req.query.limit && !isNaN(req.query.page)) {
  //       return res.send(getPaginationResponse<PrizeHistoryRepository>(data, req.query.page, req.query.limit, Number(data[0].count)))
  //     }
  //     return res.send(data)
  //   } catch (error) {
  //     return ErrorService.error(res, error);
  //   }
  // }

}