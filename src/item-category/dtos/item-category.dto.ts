import { ItemEntity } from "src/item/entities/item.entity";
import { IItemCategory } from "../interfaces/item-category.interface";

export class ItemCategoryDTO implements IItemCategory{
    category_id?: number;
    category_name: string;
    category_status: boolean;
    itemsList?: ItemEntity[];
}