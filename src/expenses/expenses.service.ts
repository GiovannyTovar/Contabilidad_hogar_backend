import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpensesUpdateEntity } from 'src/expenses-update/entities/expenses-update.entity';
import { Between, Equal, Repository } from 'typeorm';
import { ExpensesDTO } from './dtos/expenses.dto';
import { ExpenseUpdateDTO } from './dtos/expense-update.dto';
import { ExpensesEntity } from './entities/expenses.entity';
import { CreateExpensesUpdateDTO } from 'src/expenses-update/dtos/create-expenses-update.dto';

@Injectable()
export class ExpensesService {
    constructor(@InjectRepository(ExpensesEntity) private readonly expenseRespository: Repository<ExpensesEntity>,
    @InjectRepository(ExpensesUpdateEntity) private readonly expenseUpdateRepository: Repository<ExpensesUpdateEntity>) { }

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

    // Metodo para actualizar un gasto (recibe el id del gasto, nuevo valor y motivo de actualizacion)
    async updateExpense(expenseId: number, expenseUpdateDTO: ExpenseUpdateDTO): Promise<any> {
        // Buscar el gasto ORIGINAL para saber el valor antes de actualizarlo.
        const findExpense = await this.expenseRespository.findOne(expenseId);
        let prevalue: number;
        if(findExpense){
            // Si el gasto existe, cambiarle el antiguo valor por el nuevo valor y actualizarlo
            prevalue = findExpense.expense_value;
            findExpense.expense_value = expenseUpdateDTO.expense_value;
            const updatedExpense = await this.expenseRespository.update(expenseId, findExpense);
            if(updatedExpense){
                // SI el gasto se actualiza OK, crear el registro de actualizacion
                let createExpensesUpdateDTO: CreateExpensesUpdateDTO ;
                createExpensesUpdateDTO.update_prevalue = prevalue;
                createExpensesUpdateDTO.update_posvalue = expenseUpdateDTO.expense_value;
                createExpensesUpdateDTO.update_description = expenseUpdateDTO.update_description;
                createExpensesUpdateDTO.user_id = expenseUpdateDTO.user_id;
                let updateDate: Date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Bogota"}));
                createExpensesUpdateDTO.update_date = updateDate;
                const expenseUpdate = await this.expenseUpdateRepository.save(createExpensesUpdateDTO);
                if(expenseUpdate){
                    return updatedExpense; // Devolver el gasto actualizado 
                }else{
                    return null; // Se actualizo el gasto, pero no se creo el registro de actualizacion
                }
            }else{
                return null; // Se encontró el gasto pero no se pudo actualizar 
            }
        }else{
            return null; // No se encontro el gasto a actualizar
        }
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
