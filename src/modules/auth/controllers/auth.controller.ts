import { Injectable } from '@nestjs/common';
import {
  RegisterRequestDTO,
  RegisterResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class BaseAuthController {
  constructor(private readonly authService: AuthService) {}

  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const user = await this.authService.register(data.identity, data.password);
    return { message: user.identity };
  }

  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
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
