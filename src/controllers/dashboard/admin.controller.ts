import {AdminModel, ValidatedRequest, ValidatedRequestBody} from "../../models";
import {ErrorService, ResponseHelper} from "../../utils";
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

}
