import { UserRoleEntity } from "src/user-role/entities/user-role.entity";
import { IUser } from "../interfaces/user.interface";

export class UserDTO implements IUser{
    user_id?: number;
    user_dni: string;
    user_name: string;
    user_phone: string;
    user_status: boolean;
    role_id?: UserRoleEntity;

}