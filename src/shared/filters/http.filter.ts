import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  InvalidCredentialsException,
  UserNotFoundException,
  AppNotFoundException,
  UserAlreadyExistsException,
  DomainException,
} from '../../domain/exceptions/auth.exception';

const httpCodeMapping = new Map([
  [InvalidCredentialsException.name, HttpStatus.BAD_REQUEST],
  [UserNotFoundException.name, HttpStatus.NOT_FOUND],
  [AppNotFoundException.name, HttpStatus.NOT_FOUND],
  [UserAlreadyExistsException.name, HttpStatus.BAD_REQUEST],
]);

@Catch(DomainException)
export class HttpDomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      httpCodeMapping.get(exception.constructor.name) ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
