import {
    ErrorService, SsenariyRepository, SsenariyModel,
    PaginationParams, ValidatedRequest, ValidatedRequestQuery, ValidatedRequestBody
    , ErrorEnum, getPaginationResponse, BaseStatusEnum
} from '..';

import { CONFLICT } from 'http-status-codes';

export class SsenariyController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {

            let data = await SsenariyRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await getPaginationResponse<SsenariyModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }


    static async getById(req: ValidatedRequest<any>, res) {
        try {
            let data = await SsenariyRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<SsenariyModel>>, res) {
        try {

            let checkData = await SsenariyRepository.getByName(req.body.name);
            if (checkData) return ErrorService.error(res, ErrorEnum.nameUsed, CONFLICT);

            const data = await SsenariyRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<SsenariyModel>>, res) {
        try {
            req.body.id = req.params.id;
            let data = await SsenariyRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await SsenariyRepository.updateStatus(req.params.id, BaseStatusEnum.DELETED);
            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}
