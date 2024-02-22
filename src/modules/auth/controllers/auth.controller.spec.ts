import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BaseAuthController } from './auth.controller';
import { AuthService } from '../auth.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthHttpController } from './auth-http.controller';

describe('BaseAuthController', () => {
  let app: INestApplication;

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
    await app.init();
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

  const cases = [
    [{ identity: 'test', password: 'test' }, ['app_id must be a number']],
    [
      { identity: 'test', password: '', app_id: 1 },
      ['password should not be empty'],
    ],
    [
      { identity: '', password: 'test', app_id: 1 },
      ['identity should not be empty'],
    ],
  ];

  test.each(cases)(
    'given %p as payload, should fail with %p',
    async (...args) => {
      const [payload, message] = args;
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(payload)
        .expect(400)
        .expect({ message: message, error: 'Bad Request', statusCode: 400 });
    },
  );
});
