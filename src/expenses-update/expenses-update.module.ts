import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesUpdateEntity } from './entities/expenses-update.entity';
import { ExpensesUpdateController } from './expenses-update.controller';
import { ExpensesUpdateService } from './expenses-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesUpdateEntity])],
  controllers: [ExpensesUpdateController],
  providers: [ExpensesUpdateService]
})
export class ExpensesUpdateModule {}
