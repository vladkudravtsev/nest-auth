import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';
import {
  AppNotFoundException,
  InvalidCredentialsException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../../domain/exceptions/auth.exception';
import { UserService } from '../user/user.service';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly appService: ApplicationService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(identity: string, password: string) {
    if (await this.userService.exists(identity)) {
      throw new UserAlreadyExistsException(identity);
    }

    const passwordHash = await hash(password, 10);
    return this.userService.create(identity, passwordHash);
  }

  public async login(identity: string, password: string, appId: number) {
    const user = await this.userService.findOne(identity);
    if (!user) {
      throw new UserNotFoundException(identity);
    }

    const isLoggedIn = await compare(password, user.passwordHash);
    if (!isLoggedIn) {
      throw new InvalidCredentialsException();
    }

    const app = await this.appService.findById(appId);
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
