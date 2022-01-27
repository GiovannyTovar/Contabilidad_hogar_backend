import { IncomeEntity } from "src/income/entities/income.entity";
import { IIncomeCategory } from "../interfaces/income-category.interface";

export class IncomeCategoryDTO implements IIncomeCategory{
    income_c_id?: number;
    income_c_name: string;
    income_status: boolean;
    incomeList?: IncomeEntity[];    
}