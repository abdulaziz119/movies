import {Response } from 'express';
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdvertisingModule, ValidatedRequest, ValidatedRequestParams, ValidatedRequestQuery} from "../../models";
import {AdvertisingRepository} from "../../repository";

export class BotAdvertisingController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data: AdvertisingModule[]  = await AdvertisingRepository.frontedGetAll(req.query)

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
            const result = await AdvertisingRepository.frontedGetOne(req.params)
            await  AdvertisingRepository.incrementSeenIfNot(result.id)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
