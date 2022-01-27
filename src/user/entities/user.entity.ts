import { UserRoleEntity } from "src/user-role/entities/user-role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_dni: string;

    @Column()
    user_name: string;

    @Column()
    user_phone: string;

    @Column({default: 1})
    user_status: boolean;

    // Relacion Muchos a Uno con la entidad user_role
    @ManyToOne(type => UserRoleEntity, role_id => role_id.usersList)
    role_id: UserRoleEntity;
}
