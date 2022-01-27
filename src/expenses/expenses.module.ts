import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesEntity } from './entities/expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesEntity])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
