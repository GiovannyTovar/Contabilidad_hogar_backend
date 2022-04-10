import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_role")
export class UserRoleEntity{
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    role_name: string;

    @Column({default: 1})
    role_status: boolean;

    // Relacion Uno a Muchos con la entidad users
    @OneToMany(() => UserEntity, (user) => user.userRole)
    users : UserEntity[];
}