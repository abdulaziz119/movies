import {
    AdminModel,
    AdvertisingModule, ErrorEnum,
    ValidatedRequest,
    ValidatedRequestBody, ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdminsRepository, AdvertisingRepository} from "../../repository";
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
            const result:AdvertisingModule[]  = await AdvertisingRepository.getAll(req.query)
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
