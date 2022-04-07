import { IncomeCategoryEntity } from "src/income-category/entities/income-category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('income')
export class IncomeEntity{
    
    @PrimaryGeneratedColumn()
    income_id: number;
    
    //@Column({type: 'timestamp', default:() => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn()
    income_date: Date;

    @Column()
    income_value: number;

    //Relacion Muchos a Uno con la entidad income_category
    @ManyToOne(type => IncomeCategoryEntity, incomeCategory => incomeCategory.incomeL)
    incomeCategory: IncomeCategoryEntity;
    

    // No genera relacion, solo se guarda el id del usuario que genera el registro
    @Column()
    user_id: number;
}