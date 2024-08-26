import {UNPROCESSABLE_ENTITY} from "http-status-codes";

export class ValidationException extends Error {
  statusCode: number;

  constructor(message: string = '', statusCode: number = UNPROCESSABLE_ENTITY) {
    super(message)
    this.statusCode = statusCode
  }

}