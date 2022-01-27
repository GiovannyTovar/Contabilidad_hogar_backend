import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeCategoryEntity } from './entities/income-category.entity';
import { IncomeCategoryController } from './income-category.controller';
import { IncomeCategoryService } from './income-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeCategoryEntity])],
  controllers: [IncomeCategoryController],
  providers: [IncomeCategoryService]
})
export class IncomeCategoryModule {}
