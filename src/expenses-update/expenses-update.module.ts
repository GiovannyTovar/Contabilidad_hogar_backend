import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesUpdateEtity } from './entities/expenses-update.entity';
import { ExpensesUpdateController } from './expenses-update.controller';
import { ExpensesUpdateService } from './expenses-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesUpdateEtity])],
  controllers: [ExpensesUpdateController],
  providers: [ExpensesUpdateService]
})
export class ExpensesUpdateModule {}
