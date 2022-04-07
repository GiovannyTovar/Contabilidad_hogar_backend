import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleDTO } from './dtos/user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {

    //Inyectar el repositorio
    constructor(@InjectRepository(UserRoleEntity) private readonly userRoleRepository: Repository<UserRoleEntity>){}

    // Metodo para buscar un Rol de usuario por ID
    async getUserRoleById(userRoleId: number): Promise<UserRoleEntity>{
        const userRole = await this.userRoleRepository.findOne(userRoleId);
        return userRole;
    }

    // Metodo para buscar TODOS los Roles de usuario
    async getUserRoleList(): Promise<UserRoleEntity[]>{
        const userRoleList = await this.userRoleRepository.find();
        return userRoleList;        
    }

    // Metodo para crear un rol de usuario
    async createUserRole(createUserRoleDTO: UserRoleDTO): Promise<UserRoleDTO>{
        const userRole = this.userRoleRepository.save(createUserRoleDTO);
        return userRole;
    }

    // Metodo para actualizar un rol de ususario
    async updateUserRole(userRoleId: number, userRoleDTO: UserRoleDTO): Promise<any>{
        const updatedUserRole = await this.userRoleRepository.update(userRoleId, userRoleDTO);
        return updatedUserRole;
    }

    // Metodo para eliminar un rol de usuario
    async deleteUserRole(userRoleId: number): Promise<UserRoleDTO>{
        const findUserRole = await this.getUserRoleById(userRoleId);
        if(!findUserRole){
            return null;
        }
        findUserRole.role_status = false;
        await this.userRoleRepository.update(userRoleId,findUserRole);
        return findUserRole;
    }

}
