import { IncomeEntity } from "src/income/entities/income.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('income_category')
export class IncomeCategoryEntity{

    @PrimaryGeneratedColumn()
    income_c_id: number;

    @Column()
    income_c_name: string;

    @Column({default: 1})
    income_status: boolean;

    // Relacion Uno a Muchos con la entidad income
    @OneToMany(type => IncomeEntity, incomeList => incomeList.incomeCategory)
    income: IncomeEntity[];
    
}