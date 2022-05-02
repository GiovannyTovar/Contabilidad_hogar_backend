import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { IncomeDTO } from './dtos/income.dto';
import { IncomeEntity } from './entities/income.entity';
import { MoreThanOrEqual, Between } from "typeorm";

@Injectable()
export class IncomeService {

    constructor(@InjectRepository(IncomeEntity) private readonly incomeRespository: Repository<IncomeEntity>) { }

    // Metodo para buscar un ingreso por ID La relacion se indica en la clase Entity
    async getIncomeById(incomeId: number): Promise<IncomeEntity> {
        const income = await this.incomeRespository.findOne({
            where: { "income_id": incomeId },
            relations: ['incomeCategory'],
        });
        return income;
    }

    // Metodo para buscar TODOS los ingresos. La relacion es. La que se indica en la clase Entity
    async getIncomeList(): Promise<IncomeEntity[]> {
        const incomeList = await this.incomeRespository.find({
            relations: ['incomeCategory'],
        });
        return incomeList;
    }

    // Metodo para buscar los ingresos del mes actual
    async getRecentIncomes(): Promise<IncomeEntity[]> {
        const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Bogota"}));
        const incomeList = await this.incomeRespository.find({
            relations: ['incomeCategory'],
            where: {
                income_date: MoreThanOrEqual((date.getFullYear()) + "-" + (date.getMonth() + 1) + "-01 00:00:00")
            }
        });
        return incomeList;
    }

    // Metodo para buscar los ingresos dentro de un rango de fechas
    async getRangeIncomes(startDate: string, endDate: string): Promise<IncomeEntity[]> {
        const incomeList = await this.incomeRespository.find({
            relations: ['incomeCategory'],
            where: {
                income_date: Between(startDate, endDate+" 23:59:59")
            }
        });
        return incomeList;
    }

    // Metodo para crear un ingreso
    async createIncome(createIncomeDTO: IncomeDTO): Promise<IncomeDTO> {
        const income = this.incomeRespository.save(createIncomeDTO);
        return income;
    }

    // Metodo para actualizar un ingreso
    async updateIncome(incomeId: number, IncomeDTO: IncomeDTO): Promise<any> {
        const updatedIncome = await this.incomeRespository.update(incomeId, IncomeDTO);
        return updatedIncome;
    }

    // Metodo para eliminar un ingreso
    async deleteIncome(incomeId: number): Promise<IncomeDTO> {
        const findIncome = await this.getIncomeById(incomeId);
        if (!findIncome) {
            return null;
        }
        await this.incomeRespository.delete(incomeId);
        return findIncome;
    }
}
