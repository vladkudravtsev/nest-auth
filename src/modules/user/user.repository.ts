import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from 'src/domain/user';
import { DataSource } from 'typeorm';
import { UserMapper } from './user.mapper';
import { Repository } from './repository.interface';

@Injectable()
export class UserRepository implements Repository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: UserMapper,
  ) {}

  private get repository() {
    return this.dataSource.getRepository(UserEntity);
  }

  public async findOne(identity: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { identity } });

    if (!user) {
      return null;
    }

    return this.mapper.toDomain(user);
  }

  public async create(identity: string, passwordHash: string): Promise<User> {
    const user = await this.repository.save({
      identity,
      password: passwordHash,
    });

    return this.mapper.toDomain(user);
  }

  public async exists(identity: string): Promise<boolean> {
    return this.repository.exists({ where: { identity } });
  }
}
