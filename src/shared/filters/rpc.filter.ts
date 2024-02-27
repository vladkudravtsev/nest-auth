import { Catch, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

import { status } from '@grpc/grpc-js';
import {
  InvalidCredentialsException,
  UserNotFoundException,
  AppNotFoundException,
  UserAlreadyExistsException,
  DomainException,
} from '../../domain/exceptions/auth.exception';

const rpcCodeMapping = new Map([
  [InvalidCredentialsException.name, status.INVALID_ARGUMENT],
  [UserNotFoundException.name, status.NOT_FOUND],
  [AppNotFoundException.name, status.NOT_FOUND],
  [UserAlreadyExistsException.name, status.INVALID_ARGUMENT],
]);

@Catch(DomainException)
export class RpcDomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException): Observable<any> {
    const code = rpcCodeMapping.get(exception.constructor.name);

    return throwError(() => ({
      code: code,
      message: exception.message,
    }));
  }
}
