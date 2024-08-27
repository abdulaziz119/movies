import {
    AdminModel,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdminsRepository} from "../../repository";

export class DashboardAdminController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<AdminModel>>, res: Response) {
        try {
            const result: AdminModel = await AdminsRepository.create(req.body)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async login(req: ValidatedRequest<ValidatedRequestBody<AdminModel>>, res: Response) {
        try {
            const result = await AdminsRepository.login(req.body)

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
            const data:AdminModel[]  = await AdminsRepository.getAll(req.params)

            if (!data[0]) return res.send([]);
            if (req.params.limit && !isNaN(req.params.page))
                return res.send(getPaginationResponse<AdminModel>(data, req.params.page, req.params.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
