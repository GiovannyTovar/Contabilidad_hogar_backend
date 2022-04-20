import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesUpdateEntity } from 'src/expenses-update/entities/expenses-update.entity';
import { ExpensesEntity } from './entities/expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesEntity,ExpensesUpdateEntity])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
