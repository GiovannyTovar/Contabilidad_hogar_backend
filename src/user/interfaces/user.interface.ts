import { UserRoleEntity } from "src/user-role/entities/user-role.entity";

export interface IUser{
    readonly user_id?: number;
    readonly user_dni: string;
    readonly user_name: string;
    readonly user_phone: string;
    readonly user_status: boolean;
    readonly role_id?: UserRoleEntity; // aca el dto de user_role
}