import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { ApplicationMapper } from './application.mapper';
import { Repository } from './repository.interface';
import { App } from '../../domain/app';

@Injectable()
export class ApplicationRepository implements Repository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: ApplicationMapper,
  ) {}

  private get repository() {
    return this.dataSource.getRepository(ApplicationEntity);
  }

  public async findById(id: number): Promise<App | null> {
    const app = await this.repository.findOne({ where: { id } });

    if (!app) {
      return null;
    }

    return this.mapper.toDomain(app);
  }
}
