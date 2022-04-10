import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ItemDTO } from './dtos/item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    // Metodo Get para consumir ws obtener TODOS los items
   @Get()
   async getItemList(@Res() res) {
       const itemList = await this.itemService.getItemList();
       if(itemList.length==0){
           throw new NotFoundException('Items not found');
       }
       return res.status(HttpStatus.OK).send(itemList);
   }

   // Metodo Get con parametro para buscar un item especifico
   @Get(':item_id')
   async getItem(@Res() res, @Param('item_id') itemId: number) {
       const item = await this.itemService.getItemById(itemId);
       if (!item) {
           throw new NotFoundException('Item not found');
       } else {
           return res.status(HttpStatus.OK).send(item);
       }
   }

   // Metodo POST 
   @Post('add')
   async addItem(@Res() res, @Body() createItemDTO: ItemDTO) {
       const item = await this.itemService.createItem(createItemDTO);
       return res.status(HttpStatus.CREATED).send(item);
   }

    // Metodo Put
    @Put('update/:item_id')
    async updateItem(@Res() res, @Param("item_id") itemId: number, @Body() updateItemDTO: ItemDTO) {
        const updateItem = await this.itemService.updateItem(itemId, updateItemDTO);
        return res.status(HttpStatus.OK).send(updateItem);
    }

    // Metodo Delete
   @Delete('delete/:item_id')
   async deleteItem(@Res() res, @Param("item_id") itemId) {
       const deleteItem = await this.itemService.deleteItem(itemId);
       if (!deleteItem) {
           throw new NotFoundException('Item not found');
       }
       return res.status(HttpStatus.OK).send(deleteItem);
   }
}
