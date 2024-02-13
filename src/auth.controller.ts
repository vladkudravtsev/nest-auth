import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './api/proto/auth_pb';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Auth', 'Register')
  async register(
    data: RegisterRequest.AsObject,
  ): Promise<RegisterResponse.AsObject> {
    const user = await this.authService.register(data.identity, data.password);
    return { message: user.identity };
  }

  @GrpcMethod('Auth', 'Login')
  async login(data: LoginRequest.AsObject): Promise<LoginResponse.AsObject> {
    const token = await this.authService.login(data.identity, data.password);

    return {
      token,
    };
  }
}
