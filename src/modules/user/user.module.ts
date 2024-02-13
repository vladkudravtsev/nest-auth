import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserMapper, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
