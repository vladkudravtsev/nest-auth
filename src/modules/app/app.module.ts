import { Module } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { AppMapper } from './app.mapper';

@Module({
  providers: [AppRepository, AppMapper],
  exports: [AppRepository],
})
export class AppModule {}
