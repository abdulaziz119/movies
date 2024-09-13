import {AdminModel, AuthorizationService, ErrorEnum} from '..';
import {AdminsRepository} from "../repository";
import { Md5 } from 'ts-md5';
import {ValidationException} from "../exceptions/validation.exception";


export class AdminsService {

    static async create(params: any): Promise<any> {
        try {
            const authorizationService: AuthorizationService = new AuthorizationService();
            params.password = Md5.hashStr(params.password)
            const checkBossAdmin:any = await AdminsRepository.checkBossAdmin(params.user_id)
            console.log(checkBossAdmin,'chackBossAdmin')
            if (!checkBossAdmin.boss_admin && checkBossAdmin.boss_adm===false) {
                throw new ValidationException(ErrorEnum.CreateNotAdmin)
            }
            const user: AdminModel = await AdminsRepository.create(params)
            console.log(user,'user')
            const role=AdminsRepository.checkGetOne(user.role_id)
            const token:string = await authorizationService.sign(user,role)
            let data = {
                user_id :user.id,
                token : token
            }
            return data
        }catch (error) {
            throw new ValidationException(ErrorEnum.CreateNotAdmin)
        }
    }

    static async loginService(params: { email: string, password: string }): Promise<any> {
        try {
            const authorizationService: AuthorizationService = new AuthorizationService();
            params.password = Md5.hashStr(params.password)
            const user = await AdminsRepository.login(params)
            if (!user || user.password!==params.password) throw new ValidationException(ErrorEnum.equalPasswords)

            const role=AdminsRepository.checkGetOne(user.role_id)
            const token:string = await authorizationService.sign(user,role)
            let data = {
                user_id :user.id,
                token : token
            }
            return data
        }catch (error) {
            throw new ValidationException(ErrorEnum.NotFoundLogin)
        }
    }
}
