import { Test } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { decode } from 'jsonwebtoken';

describe('JwtService', () => {
  let service: JwtService;
  let configService: ConfigService;
  const payload = {
    appId: 'testAppId',
    subject: 'testSubject',
    audience: 'testAudience',
  };
  const validSecret = 'validSecret';
  const invalidSecret = 'invalidSecret';
  const invalidToken = 'invalidToken';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should issue a token with the correct payload', () => {
    const token = service.issueToken(payload, validSecret);
    const decoded = decode(token, { json: true });
    const delta = 1000;
    const expectedExpiration = Math.round(
      (Date.now() +
        parseInt(configService.getOrThrow('JWT_LIFETIME')) +
        delta) /
        1000,
    );

    expect(decoded).not.toBeNull();
    expect(decoded?.app_id).toBe(payload.appId);
    expect(decoded?.sub).toBe(payload.subject);
    expect(decoded?.iss).toBe(configService.get('JWT_ISSUER'));
    expect(decoded?.aud).toBe(payload.audience);
    expect(decoded?.exp).toBeLessThan(expectedExpiration);
  });

  it('should validate token with valid secret', async () => {
    const token = service.issueToken(payload, validSecret);
    const result = await service.validateToken(token, validSecret);
    expect(result).toBeDefined();
  });

  it('should throw error for invalid token with valid secret', async () => {
    await expect(
      service.validateToken(invalidToken, validSecret),
    ).rejects.toThrow();
  });

  it('should throw error for valid token with invalid secret', async () => {
    const secret = 'yourSecret';
    const token = service.issueToken(payload, secret);
    await expect(service.validateToken(token, invalidSecret)).rejects.toThrow();
  });

  it('should throw error for invalid token with invalid secret', async () => {
    await expect(
      service.validateToken(invalidToken, invalidSecret),
    ).rejects.toThrow();
  });
});
