import { ItemEntity } from "src/item/entities/item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("expenses")
export class ExpensesEntity{

    @PrimaryGeneratedColumn()
    expense_id: number;

    @Column({type: 'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    expense_date: Date;

    @Column()
    expense_value: number;

    // Relacion Muchos a Uno con la etidad items
    @ManyToOne(type => ItemEntity, itemId => itemId.expensesList)
    item_id: ItemEntity;

    // No genera relacion, solo uardar el id del usuario que creo el registro
    @Column()
    user_id: number;
}