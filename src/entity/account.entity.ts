import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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