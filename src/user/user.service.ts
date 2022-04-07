import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {


    //Inyectar el repositorio
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    // Metodo para buscar un usuario por ID La relacion se indica en la clase Entity
    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { "user_id": userId },
            relations: ['role_id'],
        });
        return user;
    }

    // Metodo para buscar un usuario por DNI La relacion se indica en la clase Entity
    async getUserByDni(userDni: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { "user_dni": userDni },
            relations: ['role_id'],
        });
        return user;
    }

    // Metodo para buscar un usuario por DNI y Phone. La relacion se indica en la clase Entity
    async getUserByDniPhone(userDni: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { "user_dni": userDni },
            relations: ['role_id'],
        });
        if (!user) {
            return null;
        }
        return user;
    }

    // Metodo para buscar TODOS los usuarios. La relacion es. La que se indica en la clase Entity
    async getUserList(): Promise<UserEntity[]> {
        const userList = await this.userRepository.find({
            relations: ['role_id'],
        });
        return userList;
    }

    // Metodo para crear un usuario
    async createUser(createUserDTO: UserDTO): Promise<UserDTO> {
        const user = this.userRepository.save(createUserDTO);
        return user;
    }

    // Metodo para actualizar un ususario
    async updateUser(userId: number, userDTO: UserDTO): Promise<any> {
        const updatedUser = await this.userRepository.update(userId, userDTO);
        return updatedUser;
    }

    // Metodo para eliminar un usuario
    async deleteUser(userId: number): Promise<UserDTO> {
        const findUser = await this.getUserById(userId);
        if (!findUser) {
            return null;
        }
        findUser.user_status = false;
        await this.userRepository.update(userId, findUser);
        return findUser;
    }
}
