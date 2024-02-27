import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDTO, RegisterRequestDTO } from '../dto/auth.dto';
import { AuthController } from './controller.interface';
import { BaseAuthController } from './auth.controller';
import { LoginResponse, RegisterResponse } from '../../../api/proto/auth_pb';

@Controller()
export class AuthGrpcController implements AuthController {
  constructor(private readonly baseController: BaseAuthController) {}

  @GrpcMethod('Auth', 'Register')
  async register(data: RegisterRequestDTO): Promise<RegisterResponse.AsObject> {
    return this.baseController.register(data);
  }

  @GrpcMethod('Auth', 'Login')
  async login(data: LoginRequestDTO): Promise<LoginResponse.AsObject> {
    return this.baseController.login(data);
  }
}
