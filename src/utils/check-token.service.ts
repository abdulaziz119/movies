import { UNAUTHORIZED } from 'http-status-codes';
import {
    ErrorService, ErrorEnum, ValidatedRequest
} from '..';

export const checkToken = async (req: ValidatedRequest<any>, res, next) => {
    try {
        // let authorization = null;
        // if (req.headers && req.headers.authorization) {
        //     authorization = req.headers.authorization.split(' ')[1];
        // }
        next();

    } catch (error) {
        ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED)
    }
}

export const checkHeader = (req: ValidatedRequest<any>, res, next) => {
    try {

        if (!req.headers.language)
            req.headers.language = `ru`;
        req.query.language = req.headers.language;
        req.body.language = req.headers.language;

        next();
        
    } catch (error) {
        ErrorService.error(res, error, UNAUTHORIZED)
    }
};