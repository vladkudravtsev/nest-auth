import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { jwtPayload } from '../../shared/types/jwt-payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  public issueToken(payload: jwtPayload, secret: string) {
    const lifetime = this.configService.get('JWT_LIFETIME');
    const issuer = this.configService.get('JWT_ISSUER');
    return sign({ app_id: payload.appId }, secret, {
      subject: payload.subject,
      expiresIn: lifetime,
      issuer: issuer,
      audience: payload.audience,
    });
  }

  public async validateToken(token: string, secret: string) {
    const decoded = await new Promise<string | JwtPayload>(
      (resolve, reject) => {
        const issuer = this.configService.get('JWT_ISSUER');
        verify(token, secret, { issuer }, (err, token) =>
          err ? reject(err) : resolve(token),
        );
      },
    );

    return decoded;
  }
}
