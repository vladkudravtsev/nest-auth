import { Module } from '@nestjs/common';
import { AppRepository } from './application.repository';
import { AppMapper } from './application.mapper';
import { ApplicationService } from './application.service';
import { Repository } from './repository.interface';

@Module({
  providers: [
    AppMapper,
    ApplicationService,
    {
      provide: Repository,
      useClass: AppRepository,
    },
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
