import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import findDoc from '@shared/utils/helper/find-doc.helper';
import createDoc from '@shared/utils/helper/create-doc.helper';
import updateDoc from '@shared/utils/helper/update-doc.helper';
import removeDoc from '@shared/utils/helper/remove-doc.helper';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<Category>,
  ) {}

  public findAll() {
    return findDoc({
      model: this.CategoryModel,
    });
  }

  public create(payload: any) {
    return createDoc({
      payload,
      model: this.CategoryModel,
    });
  }

  public update({ filter, payload }) {
    return updateDoc({
      payload,
      filter,
      model: this.CategoryModel,
    });
  }

  public remove(filter: any) {
    return removeDoc({
      filter,
      model: this.CategoryModel,
    });
  }
}
