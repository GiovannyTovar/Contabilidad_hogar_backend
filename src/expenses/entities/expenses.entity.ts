import { ExpensesUpdateEtity } from "src/expenses-update/entities/expenses-update.entity";
import { ItemEntity } from "src/item/entities/item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("expenses")
export class ExpensesEntity{

    @PrimaryGeneratedColumn()
    expense_id: number;

    @Column({type: 'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    expense_date: Date;

    @Column()
    expense_value: number;

    // Relacion Muchos a Uno con la etidad items
    @ManyToOne(type => ItemEntity, itemId => itemId.expenses)
    item: ItemEntity;

    //Relacion Uno a Muchos con la entidad expenses_update
    @OneToMany(type => ExpensesUpdateEtity, expenseUpdate => expenseUpdate.expenses)
    expensesUpdate: ExpensesUpdateEtity[];        

    // No genera relacion, solo uardar el id del usuario que creo el registro
    @Column()
    user_id: number;
}