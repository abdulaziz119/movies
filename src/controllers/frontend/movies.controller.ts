export class FrontendMoviesController {

    // static async update(req: ValidatedRequest<ValidatedRequestBody<ConfigModel>>, res: Response) {
    //     try {
    //         let config = await ConfigRepository.getOne()
    //
    //         const result = await ConfigRepository.update({
    //             id: config?.id,
    //             ...req.body
    //         })
    //
    //
    //         return res.send({
    //             statusCode: OK,
    //             statusDescription: 'Ok',
    //             data: result
    //         })
    //     } catch (error) {
    //         return ErrorService.error(res, error)
    //     }
    // }
    //
    // static async getOne(req, res: Response) {
    //     try {
    //         let data = await ConfigRepository.getOne();
    //
    //         return res.send({
    //             statusCode: OK,
    //             statusDescription: 'Ok',
    //             data: data
    //         })
    //
    //     } catch (e) {
    //         return ErrorService.error(res, e)
    //     }
    // }
}
