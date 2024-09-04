import { MoviesRepository} from "../../repository";
import {
    MoviesModel,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, MovieService, ResponseHelper} from "../../utils";
import {StatusCodes} from "http-status-codes";

export class DashboardMoviesController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<MoviesModel>>, res: Response) {
        try {
            const result: MoviesModel = await MoviesRepository.create(req.body)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await MovieService.getOne(req.params,req.headers['accept-language'] ?? 'uz')
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:MoviesModel[]  = await MoviesRepository.getAll(req.query,req.headers['accept-language'] ?? 'uz')

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<MoviesModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async queryGet(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number, query: string}>>, res) {
        try {
            if (req.query.limit <= 0 || req.query.page <= 0) {
                throw new Error('Invalid pagination parameters');
            }
            const data:MoviesModel[]  = await MoviesRepository.queryGet(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<MoviesModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
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
}
