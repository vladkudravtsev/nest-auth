import { Injectable } from '@nestjs/common';
import { App } from 'src/domain/app';
import { DataSource } from 'typeorm';
import { AppEntity } from './app.entity';
import { AppMapper } from './app.mapper';

@Injectable()
export class AppRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: AppMapper,
  ) {}

  private get repository() {
    return this.dataSource.getRepository(AppEntity);
  }

  public async findById(id: number): Promise<App | null> {
    const app = await this.repository.findOne({ where: { id } });

    if (!app) {
      return null;
    }

    return this.mapper.toDomain(app);
  }
}
