import { ExpensesEntity } from "src/expenses/entities/expenses.entity";
import { ItemCategoryEntity } from "src/item-category/entities/item-category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("items")
export class ItemEntity{

    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    item_name: string;
    
    @Column()
    item_frequency: number;

    @Column({default: 1})
    item_status: boolean;

    
    // Relacion Muchos a Uno con la entidad item_category
    @ManyToOne(type => ItemCategoryEntity, category => category.items)
    itemCategory: ItemCategoryEntity;    

    // Relacion Uno a muchos con la entidad expenses
    @OneToMany(type => ExpensesEntity, expensesList => expensesList.item)
    expenses: ExpensesEntity[];

}