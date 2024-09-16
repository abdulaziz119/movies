import {
    ErrorEnum,
    SeriesModule,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import { SeriesRepository} from "../../repository";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {NOT_FOUND, StatusCodes} from "http-status-codes";
import {Response } from 'express';

export class DashboardSeriesController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<SeriesModule>>, res: Response) {
        try {
            const result: SeriesModule = await SeriesRepository.create(req.body)
            if (!result) return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.FailedToCreateSeries)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await SeriesRepository.getOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:SeriesModule[]  = await SeriesRepository.getAll(req.query,req.headers['accept-language'] ?? 'uz')

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
            await SeriesRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<SeriesModule>>, res) {
        try {
            req.body.id = req.params.id;
            let data = await SeriesRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}
