import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Controller('user-role')
export class UserRoleController {

    // Inicializar el servicio en el constructor
    constructor(private readonly userRoleService: UserRoleService){}

    // Metodo Get para consumir ws obtener TODOS los roles de usuario
    @Get()
    async getUserRoleList(@Res() res){
        const userRoleList = await this.userRoleService.getUserRoleList();
        return res.status(HttpStatus.OK).send(userRoleList); 
    }

    // Metodo Get con parametro para buscar un rol de usuario especifico
    @Get(":role_id")
    async getUserRole(@Res() res, @Param('role_id') roleId: number){
        const userRole = await this.userRoleService.getUserRoleById(roleId);
        return res.status(HttpStatus.OK).send(userRole);
    }


}
