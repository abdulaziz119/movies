import {SeriesModule, ValidatedRequest, ValidatedRequestParams, ValidatedRequestQuery} from "../../models";
import { SeriesRepository} from "../../repository";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";

export class FrontendSeriesController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:SeriesModule[]  = await SeriesRepository.frontendGetAll(req.query,req.headers['accept-language'] ?? 'uz')

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<SeriesModule>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
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
            const data:SeriesModule[]  = await SeriesRepository.frontendGetAllMovies(req.body,req.headers['accept-language'] ?? 'uz')

            if (!data[0]) return res.send([]);
            if (req.body.limit && !isNaN(req.body.page))
                return res.send(getPaginationResponse<SeriesModule>(data, req.body.page, req.body.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

}