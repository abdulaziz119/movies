import {
    ErrorEnum,
    SeriesModule,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import { SeriesRepository} from "../../repository";
import {ErrorService, ResponseHelper} from "../../utils";
import { StatusCodes} from "http-status-codes";
import {Response } from 'express';

export class DashboardSeriesController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<SeriesModule>>, res: Response) {
        try {
            const result: SeriesModule = await SeriesRepository.create(req.body)
            if (!result) return ErrorService.error(res, {}, StatusCodes.NOT_FOUND, ErrorEnum.FailedToCreateSeries)

            return ResponseHelper.success(res, result,StatusCodes.CREATED)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await SeriesRepository.getOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result,StatusCodes.OK)
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
            const result = await SeriesRepository.getOne(req.params,req.headers['accept-language'] ?? 'uz')
            if (!result) {
                return ErrorService.error(res, ErrorEnum.NotFound, 404)
            }
            await SeriesRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<SeriesModule>>, res) {
        try {
            let newData={
                id:req.params.id,
                    ...req.body
            }
             await SeriesRepository.update(newData);
            return ResponseHelper.success(newData, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}
