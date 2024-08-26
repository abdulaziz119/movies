import {
    ErrorService, UsersModel, UsersRepository, BaseStatusEnum,
    PaginationParams, ValidatedRequest, ValidatedRequestQuery, ValidatedRequestBody, getPaginationResponse
} from '..';

export class UsersController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {

            let data = await UsersRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await getPaginationResponse<UsersModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getById(req: ValidatedRequest<any>, res) {
        try {
            let data = await UsersRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<UsersModel>>, res) {
        try {

            const data = await UsersRepository.create(req.body)
            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await UsersRepository.updateStatus(req.params.id, BaseStatusEnum.DELETED);
            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}
