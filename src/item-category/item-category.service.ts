import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCategoryDTO } from './dtos/item-category.dto';
import { ItemCategoryEntity } from './entities/item-category.entity';

@Injectable()
export class ItemCategoryService {

    //Inyectar el repositorio
    constructor(@InjectRepository(ItemCategoryEntity) private readonly userRepository: Repository<ItemCategoryEntity>) { }

    // Metodo para buscar una categoria de item por ID La relacion se indica en la clase Entity
    async getItemCategoryById(userId: number): Promise<ItemCategoryEntity> {
        const itemCategory = await this.userRepository.findOne({
            where: { "category_id": userId }
        });
        return itemCategory;
    }

    // Metodo para buscar TODOS las categorias de Items. La relacion es. La que se indica en la clase Entity
    async getItemCategoryList(): Promise<ItemCategoryEntity[]> {
        const itemCategoryList = await this.userRepository.find({});
        return itemCategoryList;
    }

    // Metodo para crear una categoria de Item
    async createItemCategory(createItemCategoryDTO: ItemCategoryDTO): Promise<ItemCategoryDTO> {
        const itemCategory = this.userRepository.save(createItemCategoryDTO);
        return itemCategory;
    }

    // Metodo para actualizar una categoria de Item
    async updateItemCategory(itemCategoryId: number, ItemCategoryDTO: ItemCategoryDTO): Promise<any> {
        const updatedItemCategory = await this.userRepository.update(itemCategoryId, ItemCategoryDTO);
        return updatedItemCategory;
    }

    // Metodo para eliminar una categoria de Item
    async deleteItemCategory(itemCategoryId: number): Promise<ItemCategoryDTO> {
        const findItemCategory = await this.getItemCategoryById(itemCategoryId);
        if (!findItemCategory) {
            return null;
        }
        findItemCategory.category_status = false;
        await this.userRepository.update(itemCategoryId, findItemCategory);
        return findItemCategory;
    }
}
