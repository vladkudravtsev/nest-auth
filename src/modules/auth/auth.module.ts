import { Module } from '@nestjs/common';
import { AuthHttpController } from './controllers/auth-http.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { ApplicationModule } from '../application/application.module';
import { AppRepository } from '../application/application.repository';
import { AuthGrpcController } from './controllers/auth-grpc.contoller';

@Module({
  imports: [UserModule, ApplicationModule],
  providers: [AuthService, JwtService, UserRepository, AppRepository],
  controllers: [AuthHttpController, AuthGrpcController],
})
export class AuthModule {}
