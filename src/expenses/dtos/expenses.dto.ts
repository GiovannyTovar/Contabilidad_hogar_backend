import { ItemEntity } from "src/item/entities/item.entity";
import { IExpenses } from "../interfaces/expenses.interface";

export class ExpensesDTO implements IExpenses{
    expense_id?: number;
    expense_date: Date;
    expense_value: number;
    item_id?: ItemEntity;
    user_id: number;
}