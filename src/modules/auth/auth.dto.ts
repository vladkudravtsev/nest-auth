import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../api/proto/auth_pb';
import { Expose } from 'class-transformer';

export class LoginRequestDTO implements LoginRequest.AsObject {
  @IsNumber({}, { message: 'app_id must be a number' })
  @Expose({ name: 'app_id' })
  appId: number;

  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterRequestDTO implements RegisterRequest.AsObject {
  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDTO implements LoginResponse.AsObject {
  token: string;
}

export class RegisterResponseDTO implements RegisterResponse.AsObject {
  message: string;
}
