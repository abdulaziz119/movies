import {NOT_FOUND} from "http-status-codes";
import {ErrorEnum} from "../models";

export class NotFoundException extends Error {
  statusCode: number;

  constructor(message: string = ErrorEnum.NotFound, statusCode: number = NOT_FOUND) {
    super(message)
    this.statusCode = statusCode
  }

}