import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './entities/item-category.entity';
import { ItemCategoryController } from './item-category.controller';
import { ItemCategoryService } from './item-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategoryEntity])],
  controllers: [ItemCategoryController],
  providers: [ItemCategoryService]
})
export class ItemCategoryModule {}
