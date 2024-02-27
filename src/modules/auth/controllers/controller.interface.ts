import {
  RegisterRequestDTO,
  RegisterResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../dto/auth.dto';

export interface AuthController {
  register(data: RegisterRequestDTO): Promise<RegisterResponseDTO>;
  login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
}
