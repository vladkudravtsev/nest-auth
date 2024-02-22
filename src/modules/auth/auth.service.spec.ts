import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from './jwt.service';
import { ConfigModule } from '@nestjs/config';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
  InvalidCredentialsException,
  AppNotFoundException,
} from '../../domain/exceptions/auth.exception';
import * as bcrypt from 'bcrypt';
import { ApplicationService } from '../application/application.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let appService: ApplicationService;
  const mockUser = { id: 1, identity: 'identity', passwordHash: 'hash' };
  const mockApp = { id: 1, name: 'test-app', secret: 'appSecret' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [
        AuthService,
        JwtService,
        {
          provide: UserService,
          useFactory: () => ({
            exists: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          }),
        },
        {
          provide: ApplicationService,
          useFactory: () => ({
            findById: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    appService = module.get<ApplicationService>(ApplicationService);
  });

  it('should register a new user with a unique identity and valid password', async () => {
    const { identity } = mockUser;
    jest.spyOn(userService, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);

    const result = await service.register(identity, 'password');

    expect(result).toEqual(mockUser);
  });

  it('should throw UserAlreadyExistsException when registering a new user with an existing identity', async () => {
    jest.spyOn(userService, 'exists').mockResolvedValueOnce(true);
    await expect(
      service.register('existingUser', 'validPassword'),
    ).rejects.toThrow(UserAlreadyExistsException);
  });

  it('should return a token for valid user login', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);
    jest.spyOn(appService, 'findById').mockResolvedValueOnce(mockApp);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const token = await service.login('identity', 'password', 1);
    expect(token).toEqual(expect.any(String));
  });

  it('should throw UserNotFoundException when user is not found', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null);

    await expect(service.login('', '', 0)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it('should throw InvalidCredentialsException when credentials are invalid', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(false));

    await expect(service.login('', '', 0)).rejects.toThrow(
      InvalidCredentialsException,
    );
  });

  it('should throw AppNotFoundException when app is not found', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    jest.spyOn(appService, 'findById').mockResolvedValueOnce(null);
    await expect(service.login('', '', 0)).rejects.toThrow(
      AppNotFoundException,
    );
  });
});
