import {
  BaseStatusEnum,
  ErrorEnum,
  ErrorService,
  getPaginationResponse,
  NotificaitionSsenariyModel,
  NotificaitionSsenariyRepository,
  NotificationSsenariyService,
  PaginationParams,
  ValidatedRequest,
  ValidatedRequestBody,
  ValidatedRequestQuery
} from '..';
import {CREATED, NOT_FOUND} from "http-status-codes";

export class NotificaitionSsenariyController {

  static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
    try {

      let data = await NotificaitionSsenariyRepository.getAll(req.query);
      if (!data[0]) return res.send(null);

      if (req.query.limit && !isNaN(req.query.page))
        return res.send(getPaginationResponse<NotificaitionSsenariyModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

      return res.send(data);
    } catch (error) {
      return ErrorService.error(res, error);
    }
  }


  static async getById(req: ValidatedRequest<any>, res) {
    try {
      let data = await NotificaitionSsenariyRepository.getById(req.params.id);

      if (!data) {
        return ErrorService.error(res, ErrorEnum.NotFound, NOT_FOUND)
      }

      return res.send(data);
    } catch (error) {
      return ErrorService.error(res, error);
    }
  }

  static async create(req: ValidatedRequest<ValidatedRequestBody<NotificaitionSsenariyModel>>, res) {
    try {
      try {
        await NotificationSsenariyService.check(req)

      } catch (error) {
        return ErrorService.error(res, error.message, error.statusCode)
      }

      const data = await NotificaitionSsenariyRepository.create(req.body)
      return res.status(CREATED).send(data);

    } catch (error) {
      return ErrorService.error(res, error);
    }
  }

  static async update(req: ValidatedRequest<ValidatedRequestBody<NotificaitionSsenariyModel>>, res) {
    try {
      try {
        await NotificationSsenariyService.check(req)

      } catch (error) {
        return ErrorService.error(res, error.message, error.statusCode)
      }

      req.body.id = req.params.id;

      let data = await NotificaitionSsenariyRepository.update(req.body);

      return res.send(data);
    } catch (error) {
      return ErrorService.error(res, error);
    }
  }

  static async delete(req: ValidatedRequest<any>, res) {
    try {

      await NotificaitionSsenariyRepository.updateStatus(req.params.id, BaseStatusEnum.DELETED);
      return res.send({success: true});

    } catch (error) {
      return ErrorService.error(res, error);
    }
  }

}
