import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/repositories/user.repository';
import { hash, compare } from 'bcrypt';
import { JwtService } from './jwt.service';
import { AppRepository } from './db/repositories/app.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appRepository: AppRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(identity: string, password: string) {
    const passwordHash = await hash(password, 10);
    return this.userRepository.create(identity, passwordHash);
  }

  public async login(identity: string, password: string, appId: number) {
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

    const app = await this.appRepository.findById(appId);

    if (!app) {
      // TODO: throw domain exception
      throw new Error('app not found');
    }

    const token = this.jwtService.issueToken(
      {
        appId: appId.toString(),
        subject: identity,
        audience: app.name,
      },
      app.secret,
    );

    return token;
  }
}
