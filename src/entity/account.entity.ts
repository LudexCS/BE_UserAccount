import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {UserEditDto} from "../dto/accontEdit.dto";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'nickname', unique: true })
    nickname: string;

    @Column({ name: 'password' })
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        name: 'role'
    })
    role: Role;

    @Column({ name: 'registered_at' })
    registeredAt: Date;
}


export const toAccountEntity = (dto: UserEditDto): Partial<Account> => {
    const entity: Partial<Account> = {};
    if (dto.nickname !== undefined) entity.nickname = dto.nickname;
    return entity;
};