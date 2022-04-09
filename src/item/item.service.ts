import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from './dtos/item.dto';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemService {
    //Inyectar el repositorio
    constructor(@InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>) { }

    // Metodo para buscar un item por ID La relacion se indica en la clase Entity
    async getItemById(itemId: number): Promise<ItemEntity> {
        const item = await this.itemRepository.findOne({
            where: { "item_id": itemId }
        });
        return item;
    }

    // Metodo para buscar TODOS los Items. La relacion es. La que se indica en la clase Entity
    async getItemList(): Promise<ItemEntity[]> {
        const itemList = await this.itemRepository.find({
            relations: ['category_id'],
            order: {
                'category_id': 'ASC',
                'item_frequency': 'ASC'
            }
        });
        return itemList;
    }

    // Metodo para crear un Item
    async createItem(createItemDTO: ItemDTO): Promise<ItemDTO> {
        const item = this.itemRepository.save(createItemDTO);
        return item;
    }

    // Metodo para actualizar un Item
    async updateItem(itemId: number, ItemDTO: ItemDTO): Promise<any> {
        const updatedItem = await this.itemRepository.update(itemId, ItemDTO);
        return updatedItem;
    }

    // Metodo para eliminar un Item
    async deleteItem(itemId: number): Promise<ItemDTO> {
        const findItem = await this.getItemById(itemId);
        if (!findItem) {
            return null;
        }
        findItem.item_status = false;
        await this.itemRepository.update(itemId, findItem);
        return findItem;
    }
}
