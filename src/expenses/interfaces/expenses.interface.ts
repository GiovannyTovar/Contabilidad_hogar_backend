import { ItemEntity } from "src/item/entities/item.entity";

export interface IExpenses{
    readonly expense_id?: number;
    readonly expense_date: Date;
    readonly expense_value: number;
    readonly item_id?: ItemEntity;
    readonly user_id: number;
}