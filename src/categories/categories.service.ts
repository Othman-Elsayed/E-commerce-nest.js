import { CategoriesRepository } from './repository/categories.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly catRepo: CategoriesRepository) {}

  public async findAlCategories() {
    return this.catRepo.findAll();
  }
}
