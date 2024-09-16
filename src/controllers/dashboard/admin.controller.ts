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
import {Response } from 'express';

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

            if (!result) return ErrorService.error(res, {}, StatusCodes.UNAUTHORIZED, ErrorEnum.NotFoundLogin)

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
            const result:AdminModel[]  = await AdminsRepository.getAll(req.query)

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
            await AdminsRepository.delete(req.params.id)
            return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
}
