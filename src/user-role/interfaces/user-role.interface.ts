import { UserEntity } from "src/user/entities/user.entity";

export interface IUserRole{
    readonly role_id?: number;
    readonly role_name: string;
    readonly role_status: boolean;
    readonly usersList?: UserEntity[];
}