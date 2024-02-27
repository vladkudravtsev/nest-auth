import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';

@Injectable()
export abstract class Repository {
  public abstract findOne(identity: string): Promise<User | null>;
  public abstract create(identity: string, passwordHash: string): Promise<User>;
  public abstract exists(identity: string): Promise<boolean>;
}
