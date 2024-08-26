import {Response} from "express";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

export class ResponseHelper {
  static pagination<T>(res: Response, data: T[], page: number, limit: number, count: number) {
    return ResponseHelper.success(res, ResponseHelper.paginationObject<T>(data, page, limit, count), StatusCodes.OK)
  }

  static paginationObject<T>(data: T[], page: number, limit: number, count: number) {
    return {
      pagination: {
        current: page,
        previous: 0,
        next: 0,
        perPage: limit,
        totalPage: Math.ceil(count / limit),
        totalItem: count
      },
      list: data
    }
  }

  static success(res: Response, data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return res.status(statusCode).json(ResponseHelper.successObject(data, statusCode))
  }

  static error(res: Response, message: string = '', statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, details: object = {}) {
    return res.status(statusCode).json(
      ResponseHelper.errorObject(message, statusCode, details)
    )
  }

  static validation(res: Response, data: any, statusCode: StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY) {
    return ResponseHelper.error(res, data, statusCode)
  }

  static async catchError(res: Response, error: any) {
    let statusCode: StatusCodes
    let message: string

    if (error instanceof Error) {
      statusCode = StatusCodes.NOT_FOUND
      message = error.message ?? getReasonPhrase(statusCode)
    } else {

      statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
      message = error.message ?? getReasonPhrase(statusCode)
    }

    return ResponseHelper.error(res, message, statusCode, error?.details)
  }

  static successObject(data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      data: data
    }
  }

  static errorObject(message: string = '', statusCode: StatusCodes = StatusCodes.OK, details: object = {}) {
    return {
      statusCode: statusCode,
      statusDescription: getReasonPhrase(statusCode),
      message: message,
      details: details
    }
  }
}
