import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/repositories/user.repository';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(identity: string, password: string) {
    const passwordHash = await hash(password, 10);
    return this.userRepository.create(identity, passwordHash);
  }

  public async login(identity: string, password: string) {
    const user = await this.userRepository.findOne(identity);

    if (!user) {
      // TODO: throw domain exception
      throw new Error('User not found');
    }

    const isLoggedIn = await compare(password, user.passwordHash);

    if (!isLoggedIn) {
      // TODO: throw domain exception
      throw new Error('wrong password');
    }

    // TODO: generate jwt token
    return '';
  }
}
