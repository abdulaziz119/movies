import {StorySsenariyWithRelationModel, ValidatedRequest, ValidatedRequestQuery} from "../../models";
import {ErrorService, StorySsenariyService} from "../../utils";
import {Response} from 'express'
import {OK} from "http-status-codes";

export class StorySsenariyController {
  static async getOne(
    req: ValidatedRequest<ValidatedRequestQuery<{ user_id: number }>>,
    res: Response
  ) {
    try {
      let ss: StorySsenariyWithRelationModel = await StorySsenariyService.getActiveStorySsenariy(req.query.user_id)
      await StorySsenariyService.handleDays(ss, false)

      let result = StorySsenariyService.getForFrontend(ss, req.headers['accept-language'] ?? 'uz')

      return res.send({
        statusCode: OK,
        statusDescription: 'Ok',
        data: result
      })

    } catch (e) {
      return ErrorService.error(res, e)
    }
  }
}
