import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/domain/user';

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
