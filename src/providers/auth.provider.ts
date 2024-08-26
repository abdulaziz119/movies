import {UserModel} from "../models";
import {HttpService} from "../utils";

export class AuthProvider {
    static async getUserById(user_id: number): Promise<UserModel> {
        const response = await this.http().get('/services/user/get-by-user-id', {
            params: {
                user_id: user_id
            }
        })

        return response.data.data
    }

    static async getPhone(phone: number): Promise<UserModel> {
        const response = await this.http().get('/services/user/get-by-phone', {
            params: {
                phone: phone
            }
        })

        return response.data.data
    }

    private static http() {
        return HttpService.instance(process.env.AUTH_URL ?? '')
    }
}
