import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { Repository } from './repository.interface';
import { UserService } from './user.service';

@Module({
  providers: [
    UserMapper,
    {
      useClass: UserRepository,
      provide: Repository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
