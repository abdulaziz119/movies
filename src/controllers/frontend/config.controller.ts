import {ConfigRepository} from "../../repository";
import {OK} from "http-status-codes";
import {ErrorService} from "../../utils";
import e from "express";

export class ConfigController {

  static async getOne(req: e.Request, res: e.Response) {
    try {
      let data = await ConfigRepository.getOne();

      let result = {
        visibility: true
      }

      if (data?.content) {
        result = data.content
      }

      return res.send({
        statusCode: OK,
        statusDescription: 'Ok',
        data: result
      })

    } catch (e) {
      return ErrorService.error(res, e)
    }
  }
}
