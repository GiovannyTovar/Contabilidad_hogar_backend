import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { IncomeCategoryDTO } from './dtos/income-category.dto';
import { IncomeCategoryService } from './income-category.service';

@Controller('income-category')
export class IncomeCategoryController {
    // Inicializar el servicio en el constructor
    constructor(private readonly incomeCategService: IncomeCategoryService) { }

    // Metodo Get para consumir ws obtener TODOS las categorias de entradas (Sueldo, Arriendo)
    @Get()
    async getIncomeCList(@Res() res) {
        const incomeCList = await this.incomeCategService.getIncomeCList();
        return res.status(HttpStatus.OK).send(incomeCList);
    }

    // Metodo Get con parametro para buscar una categoria de entrada por id
    @Get(":incomec_id")
    async getIncomeC(@Res() res, @Param('incomec_id') incomecId: number) {
        const incomeC = await this.incomeCategService.getIncomeCById(incomecId);
        return res.status(HttpStatus.OK).send(incomeC);
    }

     // Metodo POST 
     @Post("add")
     async addIncomeC(@Res() res, @Body() createIncomeCDTO: IncomeCategoryDTO) {
         const incomeC = await this.incomeCategService.createIncomeC(createIncomeCDTO);
         return res.status(HttpStatus.CREATED).send(incomeC);
     }

     // Metodo Put
    @Put("update/:incomec_id")
    async updateIncomeC(@Res() res, @Param("incomec_id") incomecId: number, @Body() updateIncomeCDTO: IncomeCategoryDTO) {
        const updateIncomeC = await this.incomeCategService.updateIncomeC(incomecId, updateIncomeCDTO);
        return res.status(HttpStatus.OK).send(updateIncomeC);
    }

    // Metodo Delete
    @Delete("delete/:incomec_id")
    async deleteIncomecId(@Res() res, @Param("incomec_id") incomeCId) {
        const deleteIncomeC = await this.incomeCategService.deleteIncomeC(incomeCId);
        if (!deleteIncomeC) {
            throw new NotFoundException('Incme Category not found');
        }
        return res.status(HttpStatus.OK).send(deleteIncomeC);
    }
}
