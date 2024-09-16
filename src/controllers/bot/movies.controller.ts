import {MoviesModel, ValidatedRequest, ValidatedRequestParams, ValidatedRequestQuery} from "../../models";
import {MoviesRepository, StatisticsRepository} from "../../repository";
import {Response } from 'express';
import {ErrorService, getPaginationResponse, MovieService, ResponseHelper, StatisticsService} from "../../utils";

export class BotMoviesController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:MoviesModel[]  = await MoviesRepository.frontendGetAll(req.query,req.headers['accept-language'] ?? 'uz')

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

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await MoviesRepository.frontendGetOne(req.params,req.headers['accept-language'] ?? 'uz')
            await StatisticsService.incrementWatchedCount({type: 'bot'})
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getFilteredMoviesWithPagination(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number, year?: string, genre?: string, name?: string}>>, res) {
        try {
            const result:MoviesModel[]  = await MovieService.getFilteredMovies(req.query)

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

    static async genreGetAll(req:Request, res: Response) {
        try {
            const result = await MoviesRepository.frontendGenreGetAll()
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
