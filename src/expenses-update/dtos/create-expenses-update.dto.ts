import { ExpensesDTO } from "src/expenses/dtos/expenses.dto";
import { IExpensesUpdate } from "../interfaces/expenses-update.interface";

export class CreateExpensesUpdateDTO implements IExpensesUpdate{
    update_id?: number;
    update_description: string;
    update_prevalue: number;
    update_posvalue: number;
    update_date: Date;
    user_id: number;
    expenses: ExpensesDTO;
}