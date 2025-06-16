import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { UsersModule } from 'src/users/users.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repository/categories.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesRepository, CategoriesService],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
