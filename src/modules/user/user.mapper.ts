import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '../../domain/user';

@Injectable()
export class UserMapper {
  public toDomain(user: UserEntity): User {
    return {
      id: user.id,
      identity: user.identity,
      passwordHash: user.password,
    };
  }
}
