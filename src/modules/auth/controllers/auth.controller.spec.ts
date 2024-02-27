import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BaseAuthController } from './auth.controller';
import { AuthService } from '../auth.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthHttpController } from './auth-http.controller';
import {
  AppNotFoundException,
  InvalidCredentialsException,
  UserNotFoundException,
} from '../../../domain/exceptions/auth.exception';
import { HttpDomainExceptionFilter } from '../../../shared/filters/http.filter';

describe('BaseAuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BaseAuthController,
        {
          provide: AuthService,
          useFactory: () => ({
            register: jest.fn(),
            login: () => 'token',
          }),
        },
      ],
      controllers: [AuthHttpController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new HttpDomainExceptionFilter());

    await app.init();

    authService = app.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/login - should login', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identity: 'test',
        password: 'test',
        app_id: 1,
      })
      .expect(201)
      .expect({ token: 'token' });
  });

  const validationCases = [
    {
      payload: { identity: 'test', password: 'test' },
      expected: ['app_id must be a number'],
    },
    {
      payload: { identity: 'test', password: '', app_id: 1 },
      expected: ['password should not be empty'],
    },
    {
      payload: { identity: '', password: 'test', app_id: 1 },
      expected: ['identity should not be empty'],
    },
  ];

  test.each(validationCases)(
    'POST /auth/login - should fail validation with $expected',
    async ({ payload, expected }) => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(payload)
        .expect(400)
        .expect({ message: expected, error: 'Bad Request', statusCode: 400 });
    },
  );

  const badRequestsCases = [
    {
      message: 'should fail with invalid credentials response',
      error: new InvalidCredentialsException(),
      expectedStatus: 400,
      expectedBody: {
        message: 'Invalid credentials',
        path: '/auth/login',
        statusCode: 400,
      },
    },
    {
      message: 'should fail with app not found response',
      error: new AppNotFoundException(1),
      expectedStatus: 404,
      expectedBody: {
        message: 'App with id: 1 not found',
        path: '/auth/login',
        statusCode: 404,
      },
    },
    {
      message: 'should fail with user not found response',
      error: new UserNotFoundException('test'),
      expectedStatus: 404,
      expectedBody: {
        message: 'User with identity: test not found',
        path: '/auth/login',
        statusCode: 404,
      },
    },
  ];

  test.each(badRequestsCases)(
    'POST /auth/login - $message',
    async ({ error, expectedStatus, expectedBody }) => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(error);
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          identity: 'test',
          password: 'test',
          app_id: 1,
        });

      expect(response.status).toEqual(expectedStatus);
      expect(response.body).toMatchObject(expectedBody);
    },
  );
});
