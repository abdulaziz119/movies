import {HttpService} from "../utils";

export class SmsProvider {
    static async sendMessage(phone: number, language: 'ru' | 'uz' | 'en', template: string, params: any[]) {
        const result = await this.http().post('/api/sms/send', {
            phone: phone,
            template: template,
            params: params
        })

        return result.data.data
    }

    private static http() {
        return HttpService.instance(process.env.SMS_URL ?? '')
    }
}
