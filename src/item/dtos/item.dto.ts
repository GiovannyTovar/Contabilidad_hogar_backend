import { ExpensesEntity } from "src/expenses/entities/expenses.entity";
import { ItemCategoryEntity } from "src/item-category/entities/item-category.entity";
import { IItem } from "../interfaces/item.interface";

export class ItemDTO implements IItem{
    item_id?: number;
    item_name: string;
    item_frequency: number;
    item_status: boolean;
    category_id?: ItemCategoryEntity;
    expensesList?: ExpensesEntity[];    
}