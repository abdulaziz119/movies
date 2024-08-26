import {FrontendMoviesController} from "./movies.controller";

export class FrontendUploadController {

    //   static async getById(req: ValidatedRequest<ValidatedRequestParams<{ user_id: number }>>, res) {
    //       try {
    //         let data: StorySsenariyWithRelationModel = await StorySsenariyService.getOrFailstorySsenariy(req.params.user_id);
    //         let result = StorySsenariyService.getForFrontend(data, req.headers['accept-language'] ?? 'uz')
    //         return res.send({
    //           statusCode: OK,
    //           statusDesc: 'OK',
    //           result: result
    //         });
    //       } catch (error) {
    //         if (error instanceof NotFoundException || error instanceof ValidationException) {
    //           return res.status(OK)
    //                 .send({
    //                   statusCode: OK,
    //                   statusDesc: 'OK',
    //                   data: null
    //                 });
    //           }
    //           return ErrorService.error(res, error);
    //       }
    //   }
    //
    // static async update(req: ValidatedRequest<ValidatedRequestBody<{
    //   user_id: number,
    //   ssenariy_id: number,
    //   date_start: string,
    //   completed_at: string
    // }>>, res) {
    //   try {
    //     let data = await UploadsRepository.getOne(req.body.user_id, req.body.ssenariy_id)
    //     if (!data) {
    //       return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.NotFound)
    //     }
    //
    //     if (req.body.date_start === '+') {
    //       data.date_start.setDate(data.date_start.getDate() + 1)
    //     } else if (req.body.date_start === '-') {
    //       data.date_start.setDate(data.date_start.getDate() - 1)
    //     } else if (req.body.date_start !== '') {
    //       data.date_start = new Date(req.body.date_start)
    //     }
    //
    //     if (data.completed_at) {
    //       if (req.body.completed_at === '+') {
    //         data.completed_at.setDate(data.completed_at.getDate() + 1)
    //       } else if (req.body.completed_at === '-') {
    //         data.completed_at.setDate(data.completed_at.getDate() - 1)
    //       } else if (req.body.completed_at !== '') {
    //         data.completed_at = new Date(req.body.completed_at)
    //       }
    //     }
    //
    //     await UploadsRepository.update(data)
    //
    //     return res.send(data)
    //
    //   } catch (error) {
    //     return ErrorService.error(res, error)
    //   }
    // }
    //
    // static async delete(req: ValidatedRequest<ValidatedRequestQuery<{
    //   user_id: number,
    //   ssenariy_id: number
    // }>>, res: Response) {
    //   try {
    //     const storySsenariy = await UploadsRepository.getOne(req.query.user_id, req.query.ssenariy_id)
    //
    //     if (!storySsenariy) {
    //       return ErrorService.error(res, {}, NOT_FOUND, ErrorEnum.NotFound)
    //     }
    //
    //     await PrizeHistoryRepository.deleteByStorySsenariyId(storySsenariy.id ?? 0)
    //
    //     await UploadsRepository.delete(storySsenariy.id ?? 0)
    //
    //     return res.status(204).send()
    //   } catch (error) {
    //     return ErrorService.error(res, error)
    //   }
    // }

}
