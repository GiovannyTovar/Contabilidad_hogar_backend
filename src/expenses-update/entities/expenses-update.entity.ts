import { ExpensesEntity } from "src/expenses/entities/expenses.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('expenses_update')
export class ExpensesUpdateEntity{
    
    @PrimaryGeneratedColumn()
    update_id: number;

    @Column()
    update_description: string;

    @Column()
    update_prevalue: number;

    @Column()
    update_posvalue: number;
      
    //@Column({type: 'timestamp', default:() => 'CURRENT_TIMESTAMP' })
    @UpdateDateColumn()
    update_date: Date;

    // No genera relacion, solo se guarda el id del usuario que genera el registro
    @Column()
    user_id: number;

    //Relacion Muchos a Uno con la entidad expense
    @ManyToOne(type => ExpensesEntity, expense => expense.expensesUpdate)
    expenses: ExpensesEntity;
        
}