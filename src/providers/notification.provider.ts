import {HttpService} from "../utils";

export class NotificationProvider {
    private static http() {
        return HttpService.instance(process.env.NOTIFICATION_URL ?? '', {timeout: 5000});
    }
    static async send(user_id: number, template_id: number ,params:any) {
        return await this.http().post('/api/send/service', {
            user_id: user_id,
            service: "streak",
            template_id: template_id,
            params: params,
        })
    }
}
