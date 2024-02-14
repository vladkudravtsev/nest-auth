import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { hash, compare } from 'bcrypt';
import { JwtService } from './jwt.service';
import { AppRepository } from '../application/application.repository';
import {
  AppNotFoundException,
  InvalidCredentialsException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../../domain/exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appRepository: AppRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(identity: string, password: string) {
    if (await this.userRepository.exists(identity)) {
      throw new UserAlreadyExistsException(identity);
    }

    const passwordHash = await hash(password, 10);
    return this.userRepository.create(identity, passwordHash);
  }

  public async login(identity: string, password: string, appId: number) {
    const user = await this.userRepository.findOne(identity);
    if (!user) {
      throw new UserNotFoundException(identity);
    }

    const isLoggedIn = await compare(password, user.passwordHash);
    if (!isLoggedIn) {
      throw new InvalidCredentialsException();
    }

    const app = await this.appRepository.findById(appId);
    if (!app) {
      throw new AppNotFoundException(appId);
    }

    const tokenPayload = {
      appId: appId.toString(),
      subject: identity,
      audience: app.name,
    };
    const token = this.jwtService.issueToken(tokenPayload, app.secret);

    return token;
  }
}
