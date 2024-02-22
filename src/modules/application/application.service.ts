import { Injectable } from '@nestjs/common';
import { Repository } from './repository.interface';

@Injectable()
export class ApplicationService {
  constructor(private readonly appRepository: Repository) {}

  public async findById(id: number) {
    return this.appRepository.findById(id);
  }
}
