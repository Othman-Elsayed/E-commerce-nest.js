import { ResponseMeta } from '@shared/decorators/response.decorator';
import { CategoriesService } from './categories.service';
import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Get()
  @ResponseMeta({ message: 'translate.categories.findAll' })
  public async getCategories() {
    return this.categoryService.findAlCategories();
  }
}
