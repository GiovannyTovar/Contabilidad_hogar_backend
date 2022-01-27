import { ExpensesEntity } from "src/expenses/entities/expenses.entity";
import { ItemCategoryEntity } from "src/item-category/entities/item-category.entity";

export interface IItem{
    readonly item_id?: number;
    readonly item_name: string;
    readonly item_frequency: number;
    readonly item_status: boolean;
    readonly category_id?: ItemCategoryEntity;
    readonly expensesList?: ExpensesEntity[]; //Revisar
}