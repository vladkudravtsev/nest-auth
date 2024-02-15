import {
  RegisterRequestDTO,
  RegisterResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../auth.dto';

export interface AuthController {
  register(data: RegisterRequestDTO): Promise<RegisterResponseDTO>;
  login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
}
