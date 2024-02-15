import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from '../auth.dto';
import { AuthController } from './controller.interface';
import { BaseAuthController } from './auth.controller';

@Controller('auth')
export class AuthHttpController implements AuthController {
  constructor(private readonly baseController: BaseAuthController) {}

  @Post('register')
  async register(
    @Body() data: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return this.baseController.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.baseController.login(data);
  }
}
