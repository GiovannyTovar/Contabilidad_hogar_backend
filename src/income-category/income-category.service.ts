import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeCategoryDTO } from './dtos/income-category.dto';
import { IncomeCategoryEntity } from './entities/income-category.entity';

@Injectable()
export class IncomeCategoryService {

    constructor(@InjectRepository(IncomeCategoryEntity) private readonly incomeCategoRespository: Repository<IncomeCategoryEntity>) { }

    // Metodo para buscar una categoria de entrada por ID La relacion se indica en la clase Entity
    async getIncomeCById(incomecId: number): Promise<IncomeCategoryEntity> {
        const incomec = await this.incomeCategoRespository.findOne({
            where: { "income_c_id": incomecId },
            relations: ['incomeL'],
        });
        return incomec;
    }

    // Metodo para buscar TODAS las  categorias de entradas. La relacion es. La que se indica en la clase Entity
    async getIncomeCList(): Promise<IncomeCategoryEntity[]> {
        const incomecList = await this.incomeCategoRespository.find({
            relations: ['incomeL'],
        });
        return incomecList;
    }

    // Metodo para crear una categorias de entrada
    async createIncomeC(createIncomeCDTO: IncomeCategoryDTO): Promise<IncomeCategoryDTO> {
        const incomec = this.incomeCategoRespository.save(createIncomeCDTO);
        return incomec;
    }
    
    // Metodo para actualizar una categorias de entrada
    async updateIncomeC(incomecId: number, IncomeCDTO: IncomeCategoryDTO): Promise<any> {
        const updatedIncomeC = await this.incomeCategoRespository.update(incomecId, IncomeCDTO);
        return updatedIncomeC;
    }

    // Metodo para eliminar una categorias de entrada
    async deleteIncomeC(incomecId: number): Promise<IncomeCategoryDTO> {
        const findIncomeC = await this.getIncomeCById(incomecId);
        if (!findIncomeC) {
            return null;
        }
        findIncomeC.income_status = false;
        await this.incomeCategoRespository.update(incomecId, findIncomeC);
        return findIncomeC;
    }
}
