import { Injectable } from '@nestjs/common';
import { AppEntity } from './application.entity';
import { App } from 'src/domain/app';

@Injectable()
export class AppMapper {
  public toDomain(app: AppEntity): App {
    return {
      id: app.id,
      name: app.name,
      secret: app.secret,
    };
  }
}
