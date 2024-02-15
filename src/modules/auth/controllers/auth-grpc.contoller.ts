import { Controller } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginResponse, RegisterResponse } from '../../../api/proto/auth_pb';
import { LoginRequestDTO, RegisterRequestDTO } from '../auth.dto';

@Controller()
export class AuthGrpcController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Auth', 'Register')
  async register(data: RegisterRequestDTO): Promise<RegisterResponse.AsObject> {
    const user = await this.authService.register(data.identity, data.password);
    return { message: user.identity };
  }

  @GrpcMethod('Auth', 'Login')
  async login(data: LoginRequestDTO): Promise<LoginResponse.AsObject> {
    const token = await this.authService.login(
      data.identity,
      data.password,
      data.appId,
    );

    return {
      token,
    };
  }
}
