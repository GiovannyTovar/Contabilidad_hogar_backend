import { ItemEntity } from "src/item/entities/item.entity";

export interface IItemCategory{
    readonly category_id?: number;
    readonly category_name: string;
    readonly category_status: boolean;
    readonly itemsList?: ItemEntity[];
}