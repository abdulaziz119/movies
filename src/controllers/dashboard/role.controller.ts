import {
    ErrorEnum,
    RolesModel,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../../utils";
import {AdminsRepository, RolesRepository} from "../../repository";
import {NOT_FOUND, StatusCodes} from "http-status-codes";

export class DashboardRoleController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<RolesModel>>, res: Response) {
        try {
            const result = await RolesRepository.create(req.body)
            if (!result) return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.FailedToCreateRole)


            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await RolesRepository.getOne(req.params)
            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const data:RolesModel[]  = await RolesRepository.getAll(req.query)

            if (!data[0]) return res.send([]);
            if (req.query.limit && !isNaN(req.query.page))
                return res.send(getPaginationResponse<RolesModel>(data, req.query.page, req.query.limit, Number(data[0].count)))

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            await RolesRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
