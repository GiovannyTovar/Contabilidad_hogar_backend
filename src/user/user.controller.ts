import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpStatus, NotAcceptableException, NotFoundException, Param, Post, Put, Res, UnauthorizedException } from '@nestjs/common';
import { Any } from 'typeorm';
import { UserUpdateDTO } from './dtos/user-update.dto';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    // Inicializar el servicio en el constructor
    constructor(private readonly userService: UserService) { }

    // Metodo Get para consumir ws obtener TODOS los usuarios
    @Get()
    async getUserList(@Res() res) {
        const userList = await this.userService.getUserList();
        if (userList.length == 0) {
            throw new NotFoundException('Users not found');
        }
        return res.status(HttpStatus.OK).send(userList);
    }


    // Metodo Get con parametro para buscar un usuario especifico por id
    @Get(":user_id")
    async getUser(@Res() res, @Param('user_id') userId: number) {
        const user = await this.userService.getUserById(userId);
        return res.status(HttpStatus.OK).send(user);
    }

    // Metodo Get con parametro para buscar un usuario especifico por dni
    @Get("dni/:user_dni")
    async getUserByDni(@Res() res, @Param('user_dni') userDni: string) {
        const user = await this.userService.getUserByDni(userDni);
        return res.status(HttpStatus.OK).send(user);
    }

    // Metodo Get con parametros para buscar un usuario especifico por dni y telefono
    @Get("login/dni/:user_dni/mark/:user_mark")
    async getUserLogin(@Res() res, @Param('user_dni') userDni: string, @Param('user_mark') userMark: string) {
        const user = await this.userService.getUserByDni(userDni);
        if (!user) {
            throw new NotFoundException('User not found');
        } else {
            if (user.user_mark === userMark) {
                user.user_mark = "confidential";
                if (user.user_status == true) {
                    return res.status(HttpStatus.OK).send(user);
                } else {
                    throw new UnauthorizedException('User Found, but the user state is INACTIVE');
                }
            } else {
                throw new BadRequestException('User Found, but the user Mark is Incorrect');
            }
        }
    }

    // Metodo POST 
    @Post("add")
    async addUser(@Res() res, @Body() createUserDTO: UserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        if (user) {
            return res.status(HttpStatus.CREATED).send(user);
        }
        throw new ConflictException("User cant be created");
    }

    // Metodo Put
    @Put("update/:user_id")
    async updateUser(@Res() res, @Param("user_id") userId: number, @Body() updateUserDTO: UserUpdateDTO) {
        const updateUser = await this.userService.updateUser(userId, updateUserDTO);
        if(updateUser){
            return res.status(HttpStatus.OK).send(updateUser);
        }
        throw new ConflictException("User cant be Updated");        
    }

    // Metodo Delete
    @Delete("delete/:user_id")
    async deleteUser(@Res() res, @Param("user_id") userId) {
        const deleteUser = await this.userService.deleteUser(userId);
        if (!deleteUser) {
            throw new NotFoundException('User not found');
        }
        return res.status(HttpStatus.OK).send(deleteUser);
    }
}