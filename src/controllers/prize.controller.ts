import {
  ErrorEnum,
  ErrorService,
  getPaginationResponse,
  PaginationParams,
  PrizeModel,
  PrizeRepository,
  ValidatedRequest,
  ValidatedRequestBody,
  ValidatedRequestParams,
  ValidatedRequestQuery
} from "..";
import {Response} from "express";
import {NOT_FOUND} from "http-status-codes";

export class PrizeController {
  static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res: Response) {
    try {
      const result = await PrizeRepository.getAll(req.query)

      if (!result[0]) return res.send(null);

      if (req.query.limit && !isNaN(req.query.page)) {
        let count = Number(result[0].count)

        result.map(item => {
          delete item.count
        })

        return res.send(getPaginationResponse<PrizeModel>(result, req.query.page, req.query.limit, count))
      }

      return res.send(result);
    } catch (error) {
      return ErrorService.error(res, error);
    }
  }

  static async getOne(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
    try {
      const result = await PrizeRepository.getOne(req.params.id)

      if (!result) {
        return ErrorService.error(res, ErrorEnum.NotFound, NOT_FOUND)
      }

      return res.send(result)
    } catch (error) {
      return ErrorService.error(res, error)
    }
  }

  static async create(req: ValidatedRequest<ValidatedRequestBody<PrizeModel>>, res: Response) {
    try {
      const result = await PrizeRepository.create(req.body)

      return res.status(201).send(result)
    } catch (error) {
      return ErrorService.error(res, error)
    }
  }

  static async update(req: ValidatedRequest<ValidatedRequestBody<PrizeModel>>, res: Response) {
    try {
      const result = await PrizeRepository.update({
        id: req.params.id,
        ...req.body
      })

      return res.send(result)
    } catch (error) {
      return ErrorService.error(res, error)
    }
  }

  static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
    try {
      const result = await PrizeRepository.getOne(req.params.id)

      if (!result) {
        return ErrorService.error(res, ErrorEnum.NotFound, 404)
      }

      await PrizeRepository.delete(req.params.id)

      return res.status(204).send()
    } catch (error) {
      return ErrorService.error(res, error)
    }
  }
}
