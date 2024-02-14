import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserMapper, UserRepository],
  exports: [UserRepository, UserMapper],
})
export class UserModule {}
