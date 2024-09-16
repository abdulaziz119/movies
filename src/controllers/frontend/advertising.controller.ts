import {
    AdvertisingModule,
    ValidatedRequest,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {AdvertisingRepository} from "../../repository";
import {Response } from 'express';
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";

export class FrontendAdvertisingController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result: AdvertisingModule[]  = await AdvertisingRepository.frontedGetAll(req.query)

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
            const result = await AdvertisingRepository.frontedGetOne(req.params)
            await  AdvertisingRepository.incrementSeenIfNot(result.id)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
