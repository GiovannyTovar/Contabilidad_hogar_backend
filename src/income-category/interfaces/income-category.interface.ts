import { IncomeEntity } from "src/income/entities/income.entity";

export interface IIncomeCategory{
    readonly income_c_id?: number;
    readonly income_c_name: string;
    readonly income_status: boolean;
    readonly incomeList?: IncomeEntity[];   // Revisar
}