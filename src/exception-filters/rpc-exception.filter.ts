import { Catch, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import {
  AppNotFoundException,
  DomainException,
  InvalidCredentialsException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from 'src/domain/exceptions/auth.exception';
import { status } from '@grpc/grpc-js';

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
