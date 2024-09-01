import {
    SeriesModule,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import { SeriesRepository} from "../../repository";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {StatusCodes} from "http-status-codes";

export class DashboardSeriesController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<SeriesModule>>, res: Response) {
        try {
            const result: SeriesModule = await SeriesRepository.create(req.body)

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
            const data:SeriesModule[]  = await SeriesRepository.getAll(req.query,req.headers['accept-language'] ?? 'uz')

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<SeriesModule>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
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
