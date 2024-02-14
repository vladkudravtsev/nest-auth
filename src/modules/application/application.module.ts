import { Module } from '@nestjs/common';
import { AppRepository } from './application.repository';
import { AppMapper } from './application.mapper';

@Module({
  providers: [AppRepository, AppMapper],
  exports: [AppRepository, AppMapper],
})
export class ApplicationModule {}
