import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CastsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
