import { IncomeCategoryEntity } from "src/income-category/entities/income-category.entity";

export interface IIncome{
    readonly income_id?: number;
    readonly income_date: Date;
    readonly income_value: number;
    readonly income_c_id?: IncomeCategoryEntity;
    readonly user_id: number;
}