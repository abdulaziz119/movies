import {
    ErrorEnum,
    RolesModel,
    ValidatedRequest,
    ValidatedRequestBody,
    ValidatedRequestParams,
    ValidatedRequestQuery
} from "../../models";
import {ErrorService, ResponseHelper} from "../../utils";
import {RolesRepository} from "../../repository";
import {StatusCodes} from "http-status-codes";
import { Response } from 'express';

export class DashboardRoleController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<RolesModel>>, res: Response) {
        try {
            const result = await RolesRepository.create(req.body)
            if (!result) return ErrorService.error(res, {}, StatusCodes.NOT_FOUND, ErrorEnum.FailedToCreateRole)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getOne(req: ValidatedRequest<ValidatedRequestParams<{id: number}>>, res: Response) {
        try {
            const result = await RolesRepository.getOne(req.params)
            return ResponseHelper.success(res, result,StatusCodes.OK)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<{limit: number, page: number}>>, res) {
        try {
            const result:RolesModel[]  = await RolesRepository.getAll(req.query)

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

    static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
        try {
            await RolesRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
