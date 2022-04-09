import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { ExpensesDTO } from './dtos/expenses.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
    // Inicializar el servicio en el constructor
    constructor(private readonly expenseService: ExpensesService) { }

    // Metodo Get para consumir ws obtener TODOS los gastos
    @Get()
    async getExpensesList(@Res() res) {
        const expensesList = await this.expenseService.getExpenseList();
        if(expensesList.length==0){
            throw new NotFoundException("Expenses not found");
        }
        return res.status(HttpStatus.OK).send(expensesList);
    }

    // Metodo Get con parametro para buscar un ingreso por id
    @Get(':expense_id')
    async getExpense(@Res() res, @Param('expense_id') expenseId: number) {
        const expense = await this.expenseService.getExpenseById(expenseId);
        if(!expense){
            throw new NotFoundException("Expense not found");
        }
        return res.status(HttpStatus.OK).send(expense);
    }

    // Metodo Get con parametro para buscar ingresos del mes actual
    @Get('/find/today-expenses')
    async getTodayExpenses(@Res() res) {
        const expensesList = await this.expenseService.getTodayExpenses();
        if(expensesList == null){
            throw new NotFoundException('Today Incomes not found');
        }else{
            return res.status(HttpStatus.OK).send(expensesList);
        }
    }

    // Metodo Get con parametros para buscar ingresos dentro de un rango de fechas
    @Get('/find/start/:startDate/end/:endDate')
    async getRangeExpenses(@Res() res, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
        console.log("Fecha = "+startDate+ " " + endDate);
        const expensesList = await this.expenseService.getRangeExpenses(startDate, endDate);
        if(expensesList == null){
            throw new NotFoundException('Expenses not found');
        }else{
            return res.status(HttpStatus.OK).send(expensesList);
        }
    }

    // Metodo POST 
    @Post('add')
    async addExpense(@Res() res, @Body() createExpenseDTO: ExpensesDTO) {
        const expense = await this.expenseService.createExpense(createExpenseDTO);
        return res.status(HttpStatus.CREATED).send(expense);
    }
}
