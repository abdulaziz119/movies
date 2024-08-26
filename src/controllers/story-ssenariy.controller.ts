import {
  ConfigRepository,
  ErrorService,
  SsenariyWithRelationModel,
  StorySsenariyRepository,
  StorySsenariyService,
  StorySsenariyWithRelationModel,
  ValidatedRequest,
  ValidatedRequestBody
} from "..";
import {Response} from "express";
import {NOT_FOUND, OK} from "http-status-codes";
import {ValidationException} from "../exceptions/validation.exception";
import {SsenariyService} from "../utils/ssenariy.service";
import {NotFoundException} from "../exceptions/not-found.exception";
import {EventHelper} from "../utils/event.helper";

export class StorySsenariyController {
  static async create(req: ValidatedRequest<ValidatedRequestBody<{
    user_id: number,
    ssenariy_id?: number
  }>>, res: Response) {
    let config = await ConfigRepository.getOne()
    if (!config?.content.visibility) {
      return res.send()
    }

    try {
      let ss: StorySsenariyWithRelationModel

      if (req.body.ssenariy_id) {
        let ssenariy: SsenariyWithRelationModel = await SsenariyService.getSsenariyWithRelations(req.body.ssenariy_id)

        let result = await StorySsenariyRepository.getOne(req.body.user_id, req.body.ssenariy_id)

        if (!result) {
          result = await StorySsenariyRepository.create({
            user_id: req.body.user_id,
            ssenariy_id: req.body.ssenariy_id,
            date_start: new Date(),
            days: [],
            completed_at: null
          })
        }

        ss = {
          ...result,
          ssenariy: ssenariy
        }

      } else {
        ss = await StorySsenariyService.getActiveStorySsenariy(req.body.user_id)
      }

      await EventHelper.streakRequested(req.body.user_id, ss.ssenariy_id)

      await StorySsenariyService.handleDays(ss, true);

      return res.send(ss)
    } catch (error) {
      if (error instanceof ValidationException) {
        return res.status(OK)
          .send({
            statusCode: OK,
            statusDesc: 'Ok',
            data: error.message
          });
      }
      if (error instanceof NotFoundException) {
        return res.status(NOT_FOUND)
          .send({
            statusCode: NOT_FOUND,
            statusDesc: 'Not found',
            data: error.message
          });
      }
      return ErrorService.error(res, error)
    }
  }
}
