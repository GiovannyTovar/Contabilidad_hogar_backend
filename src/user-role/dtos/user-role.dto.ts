import { UserEntity } from "src/user/entities/user.entity";
import { IUserRole } from "../interfaces/user-role.interface";

export class UserRoleDTO implements IUserRole{
    role_id?: number;
    role_name: string;
    role_status: boolean;
    usersList?: UserEntity[];
}