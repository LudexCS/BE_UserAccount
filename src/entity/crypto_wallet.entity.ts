import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('crypto_wallet')
export class CryptoWallet {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'address', unique: true })
    address: string;

    @Column({ name: 'registered_at' })
    registeredAt: Date;
}