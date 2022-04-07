import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { UserRoleDTO } from './dtos/user-role.dto';
import { UserRoleService } from './user-role.service';

@Controller('user-role')
export class UserRoleController {

    // Inicializar el servicio en el constructor
    constructor(private readonly userRoleService: UserRoleService) { }

    // Metodo Get para consumir ws obtener TODOS los roles de usuario
    @Get()
    async getUserRoleList(@Res() res) {
        const userRoleList = await this.userRoleService.getUserRoleList();
        if (userRoleList.length == 0) {
            throw new NotFoundException('User roles not found');
        } else {
            return res.status(HttpStatus.OK).send(userRoleList);
        }
    }

    // Metodo Get con parametro para buscar un rol de usuario especifico
    @Get(':role_id')
    async getUserRole(@Res() res, @Param('role_id') roleId: number) {
        const userRole = await this.userRoleService.getUserRoleById(roleId);
        if (!userRole) {
            throw new NotFoundException('User Role not found');
        } else {
            return res.status(HttpStatus.OK).send(userRole);
        }
    }

    // Metodo POST 
    @Post('add')
    async addUserRole(@Res() res, @Body() createUserRolDTO: UserRoleDTO) {
        const userRole = await this.userRoleService.createUserRole(createUserRolDTO);
        return res.status(HttpStatus.CREATED).send(userRole);
    }

    // Metodo Put
    @Put('update/:user_role_id')
    async updateUserRole(@Res() res, @Param("user_role_id") userRoleId: number, @Body() updateUserRoleDTO: UserRoleDTO) {
        const updateUser = await this.userRoleService.updateUserRole(userRoleId, updateUserRoleDTO);
        return res.status(HttpStatus.OK).send(updateUser);
    }

    // Metodo Delete
    @Delete('delete/:user_role_id')
    async deleteUserROle(@Res() res, @Param("user_role_id") userRoleId) {
        const deleteUserRole = await this.userRoleService.deleteUserRole(userRoleId);
        if (!deleteUserRole) {
            throw new NotFoundException('User Role not found');
        }
        return res.status(HttpStatus.OK).send(deleteUserRole);
    }

}