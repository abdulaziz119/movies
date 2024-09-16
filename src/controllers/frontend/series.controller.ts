import {SeriesModule, ValidatedRequest, ValidatedRequestParams, ValidatedRequestQuery} from "../../models";
import { SeriesRepository} from "../../repository";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";

export class FrontendSeriesController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:SeriesModule[]  = await SeriesRepository.frontendGetAll(req.query,req.headers['accept-language'] ?? 'uz')

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

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res) {
        try {
            const result = await SeriesRepository.FrontendGetOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async ByMoviesIdGetAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number,movies_id: number[]}>>, res) {
        try {
            const result:SeriesModule[]  = await SeriesRepository.frontendGetAllMovies(req.body,req.headers['accept-language'] ?? 'uz')

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
}