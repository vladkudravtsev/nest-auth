import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from './application.entity';
import { App } from '../../domain/app';

@Injectable()
export class ApplicationMapper {
  public toDomain(app: ApplicationEntity): App {
    return {
      id: app.id,
      name: app.name,
      secret: app.secret,
    };
  }
}
