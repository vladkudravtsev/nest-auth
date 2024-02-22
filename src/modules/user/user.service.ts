import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repository) {}

  public async create(identity: string, passwordHash: string) {
    return this.userRepository.create(identity, passwordHash);
  }

  public async findOne(identity: string) {
    return this.userRepository.findOne(identity);
  }

  public async exists(identity: string) {
    return this.userRepository.exists(identity);
  }
}
