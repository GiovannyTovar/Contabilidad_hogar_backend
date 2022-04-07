import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ItemCategoryDTO } from './dtos/item-category.dto';
import { ItemCategoryService } from './item-category.service';

@Controller('item-category')
export class ItemCategoryController {
     // Inicializar el servicio en el constructor
     constructor(private readonly itemCategoryService: ItemCategoryService) { }

     // Metodo Get para consumir ws obtener TODOS las categorias de items
    @Get()
    async getItemCategoryList(@Res() res) {
        const itemCategoryList = await this.itemCategoryService.getItemCategoryList();
        if(itemCategoryList.length==0){
            throw new NotFoundException('Item Categories not found');
        }
        return res.status(HttpStatus.OK).send(itemCategoryList);
    }

    // Metodo Get con parametro para buscar una categoria de item especifica
    @Get(':category_id')
    async getItemCategory(@Res() res, @Param('category_id') categoryId: number) {
        const itemCategory = await this.itemCategoryService.getItemCategoryById(categoryId);
        if (!itemCategory) {
            throw new NotFoundException('Item Category not found');
        } else {
            return res.status(HttpStatus.OK).send(itemCategory);
        }
    }

    // Metodo POST 
    @Post('add')
    async addItemCategory(@Res() res, @Body() createItemCategoryDTO: ItemCategoryDTO) {
        const itemCategory = await this.itemCategoryService.createItemCategory(createItemCategoryDTO);
        return res.status(HttpStatus.CREATED).send(itemCategory);
    }

     // Metodo Put
     @Put('update/:item_category_id')
     async updateItemCategory(@Res() res, @Param("item_category_id") itemCategoryId: number, @Body() updateItemCategoryDTO: ItemCategoryDTO) {
         const updateItemCategory = await this.itemCategoryService.updateItemCategory(itemCategoryId, updateItemCategoryDTO);
         return res.status(HttpStatus.OK).send(updateItemCategory);
     }

     // Metodo Delete
    @Delete('delete/:item_category_id')
    async deleteItemCategory(@Res() res, @Param("item_category_id") itemCategoryId) {
        const deleteItemCategory = await this.itemCategoryService.deleteItemCategory(itemCategoryId);
        if (!deleteItemCategory) {
            throw new NotFoundException('Item Category not found');
        }
        return res.status(HttpStatus.OK).send(deleteItemCategory);
    }
}
