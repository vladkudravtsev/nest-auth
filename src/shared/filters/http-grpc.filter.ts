import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { status as grpcStatus } from '@grpc/grpc-js';
import { HttpStatusCode } from 'src/shared/constants/http-grpc-status';

@Catch(HttpException)
export class HttpToGrpcExceptionFilter implements ExceptionFilter {
  /**
   * Handle HTTP exception and convert to gRPC status
   */
  catch(exception: HttpException) {
    const status: HttpStatus = exception.getStatus();
    const response: string | { [key: string]: any } = exception.getResponse();

    // Map HTTP status to gRPC status or use default INTERNAL status
    const code = HttpStatusCode[status] ?? grpcStatus.INTERNAL;

    // If the response is a string, throw an error with the message
    if (typeof response === 'string') {
      return throwError(() => ({
        code: code,
        message: response,
      }));
    }

    // If the response is an object, handle the message and throw an error
    return throwError(() => ({
      code: code,
      message: Array.isArray(response.message)
        ? response.message.join(', ')
        : exception.message,
    }));
  }
}
