import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LoginRequest, RegisterRequest } from './api/proto/auth_pb';

export class LoginRequestDTO implements LoginRequest.AsObject {
  @IsNumber()
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
