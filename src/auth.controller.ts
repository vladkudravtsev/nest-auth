import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterRequest, RegisterResponse } from './api/proto/auth_pb';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Auth', 'Register')
  register(data: RegisterRequest): RegisterResponse.AsObject {
    console.log(data);

    return { message: 'ok' };
  }
}
