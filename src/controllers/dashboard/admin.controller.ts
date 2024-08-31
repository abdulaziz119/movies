import {
    AdminModel, ErrorEnum,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {AdminsService, ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdminsRepository} from "../../repository";
import {StatusCodes} from "http-status-codes";

export class DashboardAdminController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<AdminModel>>, res: Response) {
        try {
            const result = await AdminsService.create(req.body)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async login(req: ValidatedRequest<ValidatedRequestBody<AdminModel>>, res: Response) {
        try {
            const  result = await AdminsService.loginService(req.body)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await AdminsRepository.getOne(req.params)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:AdminModel[]  = await AdminsRepository.getAll(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<AdminModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            await AdminsRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
