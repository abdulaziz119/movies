import {Response} from "express";
import {ErrorService, getPaginationResponse, ResponseHelper} from "../utils";
import {UserLevelModel, ValidatedRequest, ValidatedRequestBody} from "../models";
import {UserLevelsRepository} from "../repository";

export class UserLevelsController {
    static async getLevelsByUserLevels(req: ValidatedRequest<ValidatedRequestBody<any>>, res: Response) {
        try {
            const userLevel = req.query;
            const getUserLevels: UserLevelModel[] = await UserLevelsRepository.getUserLevels(userLevel);

            if (!getUserLevels[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page)) {
                let count: number = Number(getUserLevels[0].count)

                getUserLevels.map(item => {
                    delete item.count
                })
                return res.send(getPaginationResponse<UserLevelModel>(getUserLevels, req.query.page, req.query.limit, count))
            }
            return ResponseHelper.pagination(res, getUserLevels, req.query.page, req.query.limit, Number(getUserLevels[0].count))
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}