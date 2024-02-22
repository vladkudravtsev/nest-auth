import { Module } from '@nestjs/common';
import { AuthHttpController } from './controllers/auth-http.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { AuthGrpcController } from './controllers/auth-grpc.contoller';
import { BaseAuthController } from './controllers/auth.controller';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [UserModule, ApplicationModule, JwtModule],
  providers: [AuthService, BaseAuthController],
  controllers: [AuthHttpController, AuthGrpcController],
})
export class AuthModule {}
