import {HttpService} from "../utils";
import {AxiosInstance} from "axios";
import {TransactionModel} from "../models";

export class PackageProvider {
  private static http(): AxiosInstance {
    return HttpService.instance(process.env.PACKAGE_URL ?? '', {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.PACKAGE_TOKEN
    })
  }

  static async createTransaction(phone: number, package_id: number, service: string = 'streak', comment: string = ''): Promise<TransactionModel> {
    const result = await PackageProvider.http().post('/transaction/create', {
      packageId: package_id,
      service: service,
      comment: comment,
      phone: phone,
    })

    return result.data.data
  }
}
