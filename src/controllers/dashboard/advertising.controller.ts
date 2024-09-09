import {
    AdvertisingModule, ErrorEnum,
    ValidatedRequest,
    ValidatedRequestBody, ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdvertisingRepository} from "../../repository";
import {NOT_FOUND, StatusCodes} from "http-status-codes";
import {Response } from 'express';

export class DashboardAdvertisingController {

    static async create(req: ValidatedRequest<ValidatedRequestBody<AdvertisingModule>>, res: Response) {
        try {
            const result = await AdvertisingRepository.create(req.body)

            if (!result) return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.FailedToCreateAd)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:AdvertisingModule[]  = await AdvertisingRepository.getAll(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<AdvertisingModule>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await AdvertisingRepository.getOne(req.params)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            await AdvertisingRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
