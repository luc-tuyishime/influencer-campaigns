import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 11000:
        status = HttpStatus.CONFLICT;
        message = 'Email already exists';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
    });
  }
}
