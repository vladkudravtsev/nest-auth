import { Module } from '@nestjs/common';
import { AuthHttpController } from './controllers/auth-http.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { AuthGrpcController } from './controllers/auth-grpc.contoller';
import { BaseAuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, ApplicationModule],
  providers: [AuthService, JwtService, BaseAuthController],
  controllers: [AuthHttpController, AuthGrpcController],
})
export class AuthModule {}
