import {
  ErrorEnum,
  ErrorService,
  PrizeHistoryRepository,
  StorySsenariyRepository,
  StorySsenariyService,
  StorySsenariyWithRelationModel,
  ValidatedRequest,
  ValidatedRequestBody,
  ValidatedRequestParams,
  ValidatedRequestQuery
} from '../..';
import {NOT_FOUND, OK} from "http-status-codes";
import {NotFoundException} from "../../exceptions/not-found.exception";
import {Response} from "express";
import {ValidationException} from "../../exceptions/validation.exception";


export class SsenariyController {

    static async getById(req: ValidatedRequest<ValidatedRequestParams<{ user_id: number }>>, res) {
        try {
          let data: StorySsenariyWithRelationModel = await StorySsenariyService.getOrFailstorySsenariy(req.params.user_id);
          let result = StorySsenariyService.getForFrontend(data, req.headers['accept-language'] ?? 'uz')
          return res.send({
            statusCode: OK,
            statusDesc: 'OK',
            result: result
          });
        } catch (error) {
          if (error instanceof NotFoundException || error instanceof ValidationException) {
            return res.status(OK)
                  .send({
                    statusCode: OK,
                    statusDesc: 'OK',
                    data: null
                  });
            }
            return ErrorService.error(res, error);
        }
    }

  static async update(req: ValidatedRequest<ValidatedRequestBody<{
    user_id: number,
    ssenariy_id: number,
    date_start: string,
    completed_at: string
  }>>, res) {
    try {
      let data = await StorySsenariyRepository.getOne(req.body.user_id, req.body.ssenariy_id)
      if (!data) {
        return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.NotFound)
      }

      if (req.body.date_start === '+') {
        data.date_start.setDate(data.date_start.getDate() + 1)
      } else if (req.body.date_start === '-') {
        data.date_start.setDate(data.date_start.getDate() - 1)
      } else if (req.body.date_start !== '') {
        data.date_start = new Date(req.body.date_start)
      }

      if (data.completed_at) {
        if (req.body.completed_at === '+') {
          data.completed_at.setDate(data.completed_at.getDate() + 1)
        } else if (req.body.completed_at === '-') {
          data.completed_at.setDate(data.completed_at.getDate() - 1)
        } else if (req.body.completed_at !== '') {
          data.completed_at = new Date(req.body.completed_at)
        }
      }

      await StorySsenariyRepository.update(data)

      return res.send(data)

    } catch (error) {
      return ErrorService.error(res, error)
    }
  }

  static async delete(req: ValidatedRequest<ValidatedRequestQuery<{
    user_id: number,
    ssenariy_id: number
  }>>, res: Response) {
    try {
      const storySsenariy = await StorySsenariyRepository.getOne(req.query.user_id, req.query.ssenariy_id)

      if (!storySsenariy) {
        return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.NotFound)
      }

      await PrizeHistoryRepository.deleteByStorySsenariyId(storySsenariy.id ?? 0)

      await StorySsenariyRepository.delete(storySsenariy.id ?? 0)

      return res.status(204).send()
    } catch (error) {
      return ErrorService.error(res, error)
    }
  }

}
