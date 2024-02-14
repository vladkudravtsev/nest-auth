import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { ApplicationModule } from '../application/application.module';
import { AppRepository } from '../application/application.repository';

@Module({
  imports: [UserModule, ApplicationModule],
  providers: [AuthService, JwtService, UserRepository, AppRepository],
  controllers: [AuthController],
})
export class AuthModule {}
