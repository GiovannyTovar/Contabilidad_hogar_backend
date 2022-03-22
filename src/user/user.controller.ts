import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UnauthorizedException } from '@nestjs/common';
import { Any } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // Inicializar el servicio en el constructor
    constructor(private readonly userService: UserService) { }

    // Metodo Get para consumir ws obtener TODOS los usuarios
    @Get()
    async getUserList(@Res() res) {
        const userList = await this.userService.getUserList();
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
    @Get("login/dni/:user_dni/phone/:user_phone")
    async getUserLogin(@Res() res, @Param('user_dni') userDni: string, @Param('user_phone') userPhone:string) {
        const user = await this.userService.getUserByDniPhone(userDni);
        if (!user) {
            throw new NotFoundException('User not found');
        }else{
            if(user.user_phone === userPhone){
                if(user.user_status == true){
                    return res.status(HttpStatus.OK).send(user);
                }else{
                    throw new UnauthorizedException('User Found, but the user state is INACTIVE');
                }                
            }else{
                throw new BadRequestException('User Found, but the user Phone is Incorrect');
            }
        }        
    }

    // Metodo POST 
    @Post("add")
    async addUser(@Res() res, @Body() createUserDTO: UserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.CREATED).send(user);
    }

    // Metodo Put
    @Put("update/:user_id")
    async updateUser(@Res() res, @Param("user_id") userId: number, @Body() updateUserDTO: UserDTO) {
        const updateUser = await this.userService.updateUser(userId, updateUserDTO);
        return res.status(HttpStatus.OK).send(updateUser);
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
