import {Response} from "express";
import {ErrorService, getPaginationResponse, ResponseHelper, UserDataService} from "../utils";
import {UserDataModel, ValidatedRequest, ValidatedRequestBody} from "../models";
import {UserDataRepository} from "../repository";

export class UserDataController {

    static async packageAssigned(req: ValidatedRequest<ValidatedRequestBody<UserDataModel>>, res: Response) {
        try {
            const userData: UserDataModel = req.body;
            const userDataService: UserDataService = new UserDataService();
            await userDataService.processUserData(userData);
            return ResponseHelper.success(res, {message: "User data processed successfully"});
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getUserData(req: ValidatedRequest<ValidatedRequestBody<any>>, res: Response) {
        try {
            const {phone, month, limit, page} = req.query;
            const getUserData: UserDataModel [] = await UserDataRepository.getUserData(phone, month, limit, page);

            if (!getUserData[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page)) {
                let count: number = Number(getUserData[0].count)

                getUserData.map(item => {
                    delete item.count
                })
                return res.send(getPaginationResponse<UserDataModel>(getUserData, req.query.page, req.query.limit, count))
            }
            return ResponseHelper.pagination(res, getUserData, req.query.page, req.query.limit, Number(getUserData[0].count))
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getRelevantData(req: ValidatedRequest<ValidatedRequestBody<any>>, res: Response) {
        try {
            const {phone} = req.query;
            const getUserData = await UserDataRepository.getRelevantData(phone);
            return ResponseHelper.success(res, getUserData);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}
