import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from '../auth.dto';
import { AuthController } from './controller.interface';
import { BaseAuthController } from './auth.controller';

@Controller()
export class AuthGrpcController implements AuthController {
  constructor(private readonly baseController: BaseAuthController) {}

  @GrpcMethod('Auth', 'Register')
  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    return this.baseController.register(data);
  }

  @GrpcMethod('Auth', 'Login')
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.baseController.login(data);
  }
}
