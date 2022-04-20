import { ItemEntity } from "src/item/entities/item.entity";

export class ExpenseUpdateDTO{
    expense_id?: number;
    expense_value: number;
    user_id: number;
    update_description: string;
}