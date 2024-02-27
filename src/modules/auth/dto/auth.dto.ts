import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginRequestDTO {
  @IsNumber({}, { message: 'app_id must be a number' })
  appId: number;

  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class HttpLoginRequestDTO extends LoginRequestDTO {
  @Expose({ name: 'app_id' })
  appId: number;
}

export class RegisterRequestDTO {
  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDTO {
  token: string;
}

export class RegisterResponseDTO {
  message: string;
}
