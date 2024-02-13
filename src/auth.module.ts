import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UserMapper } from './db/mappers/user.mapper';
import { UserRepository } from './db/repositories/user.repository';
import { JwtService } from './jwt.service';
import { AppRepository } from './db/repositories/app.repository';
import { AppMapper } from './db/mappers/app.mapper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserMapper,
    UserRepository,
    JwtService,
    AppRepository,
    AppMapper,
  ],
})
export class AuthModule {}
