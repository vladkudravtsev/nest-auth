import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from '../auth.dto';

@Controller('auth')
export class AuthHttpController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    const user = await this.authService.register(data.identity, data.password);
    return { message: user.identity };
  }

  @Post('login')
  async login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {
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
