import { status } from '@grpc/grpc-js';
import { HttpStatus } from '@nestjs/common';

export const HttpStatusCode: Record<number, number> = {
  [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
  [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
  [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
  [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
  [HttpStatus.CONFLICT]: status.ALREADY_EXISTS,
  [HttpStatus.GONE]: status.ABORTED,
  [HttpStatus.TOO_MANY_REQUESTS]: status.RESOURCE_EXHAUSTED,
  [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
  [HttpStatus.NOT_IMPLEMENTED]: status.UNIMPLEMENTED,
  [HttpStatus.BAD_GATEWAY]: status.UNKNOWN,
  [HttpStatus.SERVICE_UNAVAILABLE]: status.UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: status.DEADLINE_EXCEEDED,
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: status.UNAVAILABLE,
  [HttpStatus.PAYLOAD_TOO_LARGE]: status.OUT_OF_RANGE,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: status.CANCELLED,
  [HttpStatus.UNPROCESSABLE_ENTITY]: status.CANCELLED,
  [HttpStatus.I_AM_A_TEAPOT]: status.UNKNOWN,
  [HttpStatus.METHOD_NOT_ALLOWED]: status.CANCELLED,
  [HttpStatus.PRECONDITION_FAILED]: status.FAILED_PRECONDITION,
};
