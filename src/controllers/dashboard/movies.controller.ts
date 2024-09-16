import {AdvertisingRepository, MoviesRepository} from "../../repository";
import {NOT_FOUND, StatusCodes} from "http-status-codes";
import {Response } from 'express';
import {
    AdvertisingModule,
    ErrorEnum,
    MoviesModel,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";

export class DashboardMoviesController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<MoviesModel>>, res: Response) {
        try {
            const result: MoviesModel = await MoviesRepository.create(req.body)
            if (!result) return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.FailedToCreateMovies)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await MoviesRepository.getOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:MoviesModel[]  = await MoviesRepository.getAll(req.query,req.headers['accept-language'] ?? 'uz')

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

    static async queryGet(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number, query: string}>>, res) {
        try {
            if (req.query.limit <= 0 || req.query.page <= 0) {
                throw new Error('Invalid pagination parameters');
            }
            const result:MoviesModel[]  = await MoviesRepository.queryGet(req.query)

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
            await MoviesRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async genreGetAll(req:Request, res:Response) {
        try {
            const result = await MoviesRepository.genreGetAll()
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
