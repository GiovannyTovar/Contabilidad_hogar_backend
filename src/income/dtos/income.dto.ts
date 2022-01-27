import { IncomeCategoryEntity } from "src/income-category/entities/income-category.entity";
import { IIncome } from "../interfaces/income.interface";

export class IncomeDTO implements IIncome{
    income_id?: number;
    income_date: Date;
    income_value: number;
    income_c_id?: IncomeCategoryEntity;
    user_id: number;

}