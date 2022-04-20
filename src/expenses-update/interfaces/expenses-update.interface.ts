export interface IExpensesUpdate{
    readonly update_id?: number;
    readonly update_description: string;
    readonly update_prevalue: number;
    readonly update_posvalue: number;
    readonly update_date: Date;
    readonly user_id: number;
}