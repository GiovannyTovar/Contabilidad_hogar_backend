import { ItemEntity } from "src/item/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("item_category")
export class ItemCategoryEntity{
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category_name: string;

    @Column({default: 1})
    category_status: boolean;

    
    // Relacion Uno a Muchos con la entidad items
    @OneToMany(type => ItemEntity, itemsList => itemsList.category_id)
    itemsList: ItemEntity[];
    
}