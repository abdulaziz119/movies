import {MoviesModel, ValidatedRequest, ValidatedRequestParams, ValidatedRequestQuery} from "../../models";
import {MoviesRepository} from "../../repository";
import {Response } from 'express';
import {ErrorService, getPaginationResponse, MovieService, ResponseHelper} from "../../utils";

export class FrontendMoviesController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:MoviesModel[]  = await MoviesRepository.frontendGetAll(req.query,req.headers['accept-language'] ?? 'uz')

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<MoviesModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await MovieService.frontendGetOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getFilteredMoviesWithPagination(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number, year?: string, genre?: string, name?: string}>>, res) {
        try {
            const data:MoviesModel[]  = await MovieService.getFilteredMovies(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<MoviesModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
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
