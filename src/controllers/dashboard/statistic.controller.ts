import {
    ErrorEnum,
    StatisticsModel,
    ValidatedRequest,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import { StatisticsRepository} from "../../repository";
import {ErrorService, ResponseHelper} from "../../utils";
import {StatusCodes} from "http-status-codes";
import {Response } from 'express';

export class DashboardStatisticController {
    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await StatisticsRepository.getOne(req.params.id)
            return ResponseHelper.success(res, result,StatusCodes.OK)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:StatisticsModel[]  = await StatisticsRepository.getAll(req.query)

            let [page, limit] = [req.query.page ?? 1, req.query.limit ?? 20]

            let count: number = result[0] ? Number(result[0].count) : 0

            result.map(item => {
                delete item.count
            })

            return ResponseHelper.pagination(res, result, page, limit, count)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            const result = await StatisticsRepository.getOne(req.params.id)

            if (!result) {
                return ErrorService.error(res, ErrorEnum.NotFound, 404)
            }

            await StatisticsRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

}