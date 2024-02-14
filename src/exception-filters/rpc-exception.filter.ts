import { Catch, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import {
  AppNotFoundException,
  DomainException,
  InvalidCredentialsException,
  UserNotFoundException,
} from 'src/domain/exceptions/auth.exception';
import { status } from '@grpc/grpc-js';

const rpcCodeMapping = {
  [InvalidCredentialsException.name]: status.INVALID_ARGUMENT,
  [UserNotFoundException.name]: status.NOT_FOUND,
  [AppNotFoundException.name]: status.NOT_FOUND,
};

@Catch(DomainException)
export class DomainRpcExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException): Observable<any> {
    const code = rpcCodeMapping[exception.constructor.name];

    return throwError(() => ({
      code: code,
      message: exception.message,
    }));
  }
}
