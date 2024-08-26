import {HttpService} from "../utils";

export class HunterProvider {
  private static http() {
    return HttpService.instance(process.env.HUNTER_URL ?? '')
  }

  static async createUserEvent(user_id: number, service: string, status_code: number, title: string, detail: any) {
    return await this.http().post('/api/journal/userEvent', {
      user_id: user_id,
      service: service,
      status_code: status_code,
      title: title,
      detail: detail
    })
  }
}
