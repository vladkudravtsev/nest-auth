import { Module } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { ApplicationMapper } from './application.mapper';
import { ApplicationService } from './application.service';
import { Repository } from './repository.interface';

@Module({
  providers: [
    ApplicationMapper,
    ApplicationService,
    {
      provide: Repository,
      useClass: ApplicationRepository,
    },
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
