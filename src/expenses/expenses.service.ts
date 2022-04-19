import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, Repository } from 'typeorm';
import { ExpensesDTO } from './dtos/expenses.dto';
import { ExpensesEntity } from './entities/expenses.entity';

@Injectable()
export class ExpensesService {
    constructor(@InjectRepository(ExpensesEntity) private readonly expenseRespository: Repository<ExpensesEntity>) { }

    // Metodo para buscar un gasto por ID La relacion se indica en la clase Entity
    async getExpenseById(expenseId: number): Promise<ExpensesEntity> {
        const expense = await this.expenseRespository.findOne({
            relations: ['item','expensesUpdate'],
            where: { "expense_id": expenseId },
        });
        return expense;
    }

    // Metodo para buscar TODOS los gastos. La relacion es. La que se indica en la clase Entity
    async getExpenseList(): Promise<ExpensesEntity[]> {
        const expensesList = await this.expenseRespository.find({
            relations: ['item','expensesUpdate'],
        });
        return expensesList;
    }

    // Metodo para buscar los gastos del dia actual. La relacion es la que se indica en Entity
    async getTodayExpenses(): Promise<ExpensesEntity[]> {
        const date = new Date();
        const expensesList = await this.expenseRespository.find({
            relations: ['item','expensesUpdate'],
            where: {
                expense_date: Between((date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 00:00:00", (date.getFullYear()) + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 23:59:59")
            },
            order: {
                'expense_id': 'DESC'
            }
        });
        return expensesList;
    }

    // Metodo para buscar los gastos dentro de un rango de fechas
    async getRangeExpenses(startDate: string, endDate: string): Promise<ExpensesEntity[]> {
        const expensesList = await this.expenseRespository.find({
            relations: ['item'],
            where: {
                expense_date: Between(startDate, endDate)
            }
        });
        return expensesList;
    }

    // Metodo para registrar un gasto
    async createExpense(createExpenseDTO: ExpensesDTO): Promise<ExpensesDTO> {
        const expense = this.expenseRespository.save(createExpenseDTO);
        return expense;
    }

    // Metodo para actualizar un gasto
    async updateExpense(expenseId: number, expensesDTO: ExpensesDTO): Promise<any> {
        const updatedExpense = await this.expenseRespository.update(expenseId, expensesDTO);
        return updatedExpense;
    }

    // Metodo para eliminar un gasto
    async deleteExpense(expenseId: number): Promise<ExpensesDTO> {
        const findExpense = await this.getExpenseById(expenseId);
        if (!findExpense) {
            return null;
        }
        await this.expenseRespository.delete(expenseId);
        return findExpense;
    }

}
