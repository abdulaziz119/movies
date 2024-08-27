import { RolesModel, ValidatedRequest, ValidatedRequestBody} from "../../models";
import {ErrorService, ResponseHelper} from "../../utils";
import {RolesRepository} from "../../repository";

export class DashboardRoleController {
    static async create(req: ValidatedRequest<ValidatedRequestBody<RolesModel>>, res: Response) {
        try {
            const result = await RolesRepository.create(req.body)

            return ResponseHelper.success(res, result)
        } catch (error) {
            return ErrorService.error(res, error)
        }
    }
    // static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res: Response) {
    //     try {
    //         const result: LevelModel[] = await LevelRepository.getAll(req.query)
    //
    //         let [page, limit] = [req.query.page ?? 1, req.query.limit ?? 20]
    //
    //         let count: number = result[0] ? Number(result[0].count) : 0
    //
    //         result.map(item => {
    //             delete item.count
    //         })
    //
    //         return ResponseHelper.pagination(res, result, page, limit, count)
    //     } catch (error) {
    //         return ErrorService.error(res, error);
    //     }
    // }

    // static async getOne(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
    //     try {
    //         const result: LevelModel = await LevelRepository.getOne(req.params.id)
    //
    //         if (!result) {
    //             return ErrorService.error(res, ErrorEnum.NotFound, StatusCodes.NOT_FOUND)
    //         }
    //         result.id = parseInt(String(result.id), 10);
    //         result.ssenariy_id = parseInt(String(result.ssenariy_id), 10);
    //         result.prize_id = parseInt(String(result.prize_id), 10);
    //         return ResponseHelper.success(res, result)
    //     } catch (error) {
    //         return ErrorService.error(res, error)
    //     }
    // }
    //
    // static async create(req: ValidatedRequest<ValidatedRequestBody<LevelModel>>, res: Response) {
    //     try {
    //         const result: LevelModel = await LevelRepository.create(req.body)
    //
    //         return ResponseHelper.success(res, result)
    //     } catch (error) {
    //         return ErrorService.error(res, error)
    //     }
    // }
    //
    // static async update(req: ValidatedRequest<ValidatedRequestBody<LevelModel>>, res: Response) {
    //     try {
    //         const result: LevelModel = await LevelRepository.update({
    //             id: req.params.id,
    //             ...req.body
    //         })
    //
    //         return ResponseHelper.success(res, result)
    //     } catch (error) {
    //         return ErrorService.error(res, error)
    //     }
    // }
    //
    // static async delete(req: ValidatedRequest<ValidatedRequestParams<{ id: number }>>, res: Response) {
    //     try {
    //         const result: LevelModel = await LevelRepository.getOne(req.params.id)
    //
    //         if (!result) {
    //             return ErrorService.error(res, ErrorEnum.NotFound, 404)
    //         }
    //
    //         await LevelRepository.delete(req.params.id)
    //
    //         return ResponseHelper.success(res, null, StatusCodes.NO_CONTENT)
    //     } catch (error) {
    //         return ErrorService.error(res, error)
    //     }
    // }
}
