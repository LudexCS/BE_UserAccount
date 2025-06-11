import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {AccountEditDto} from "../dto/accontEdit.dto";

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

    @Column({ name: 'is_blocked', default: false })
    isBlocked: boolean;

    @Column({ name: 'registered_at' })
    registeredAt: Date;

    @Column({ name: 'owner_id', nullable: true })
    ownerId: string;
}


export const toAccountEntity = (dto: AccountEditDto): Partial<Account> => {
    const entity: Partial<Account> = {};
    if (dto.nickname !== undefined) entity.nickname = dto.nickname;
    return entity;
};