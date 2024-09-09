import {
    StatisticsModel,
    ValidatedRequest,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import { StatisticsRepository} from "../../repository";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {StatusCodes} from "http-status-codes";
import {Response } from 'express';

export class DashboardStatisticController {
    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await StatisticsRepository.getOne(req.params.id)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:StatisticsModel[]  = await StatisticsRepository.getAll(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<StatisticsModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            await StatisticsRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

}