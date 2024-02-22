import { Injectable } from '@nestjs/common';
import { App } from 'src/domain/app';

@Injectable()
export abstract class Repository {
  public abstract findById(id: number): Promise<App | null>;
}
