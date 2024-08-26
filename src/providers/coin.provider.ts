import {HttpService} from "../utils";

export class CoinProvider {
  private static http() {
    return HttpService.instance(process.env.COIN_URL ?? '')
  }

  static async createTransaction(user_id: number, amount: number, type: string = 'streak-prize') {
    return await this.http().post('transaction/create', {
      user_id: user_id,
      merchant_id: parseInt(process.env.MERCHANT_ID ?? '1'),
      data: {
        type: type
      },
      amount: amount,
      type: type,
      debit: true,
      status: 1
    })
  }
}
