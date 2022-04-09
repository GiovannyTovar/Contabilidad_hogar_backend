import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { IncomeDTO } from './dtos/income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {

    // Inicializar el servicio en el constructor
    constructor(private readonly incomeService: IncomeService) { }

    // Metodo Get para consumir ws obtener TODOS los ingresos
    @Get()
    async getIncomeList(@Res() res) {
        const incomeList = await this.incomeService.getIncomeList();
        if(incomeList.length==0){
            throw new NotFoundException("Incomes not found");
        }
        return res.status(HttpStatus.OK).send(incomeList);
    }

    // Metodo Get con parametro para buscar un ingreso por id
    @Get(':income_id')
    async getIncome(@Res() res, @Param('income_id') incomeId: number) {
        const income = await this.incomeService.getIncomeById(incomeId);
        if(!income){
            throw new NotFoundException("Income not found");
        }
        return res.status(HttpStatus.OK).send(income);
    }

    // Metodo Get con parametro para buscar ingresos del mes actual
    @Get('/find/current-month')
    async getRecentIncome(@Res() res) {
        const incomeList = await this.incomeService.getRecentIncomes();
        if(incomeList == null){
            throw new NotFoundException('Income not found');
        }else{
            return res.status(HttpStatus.OK).send(incomeList);
        }
    }

    // Metodo Get con parametros para buscar ingresos dentro de un rango de fechas
    @Get('/find/start/:startDate/end/:endDate')
    async getRangeIncome(@Res() res, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
        console.log("Fecha = "+startDate+ " " + endDate);
        const incomeList = await this.incomeService.getRangeIncomes(startDate, endDate);
        if(incomeList == null){
            throw new NotFoundException('Incomes not found');
        }else{
            return res.status(HttpStatus.OK).send(incomeList);
        }
    }

    // Metodo POST 
    @Post('add')
    async addIncome(@Res() res, @Body() createIncomeDTO: IncomeDTO) {
        const income = await this.incomeService.createIncome(createIncomeDTO);
        return res.status(HttpStatus.CREATED).send(income);
    }

     // Metodo Put
     @Put('update/:income_id')
     async updateIncome(@Res() res, @Param("income_id") incomeId: number, @Body() updateIncomeDTO: IncomeDTO) {
         const updateIncome = await this.incomeService.updateIncome(incomeId, updateIncomeDTO);
         return res.status(HttpStatus.OK).send(updateIncome);
     }

     // Metodo Delete
    @Delete('delete/:income_id')
    async deleteIncomeId(@Res() res, @Param("income_id") incomeId) {
        const deleteIncome = await this.incomeService.deleteIncome(incomeId);
        if (!deleteIncome) {
            throw new NotFoundException('Income not found');
        }
        return res.status(HttpStatus.OK).send(deleteIncome);
    }
}
