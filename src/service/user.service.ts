import AppDataSource from '../config/mysql.config';
import {Account, Role} from '../entity/account.entity';
import { cryptoWallet } from '../entity/cryptoWallet.entity';
import bcrypt from 'bcrypt';

export const registerUser = async ({
                                       nickname,
                                       email,
                                       password,
                                   }: {
    nickname: string;
    email: string;
    password: string;
}) => {
    const accountRepo = AppDataSource.getRepository(Account);

    const hashed = await bcrypt.hash(password, 10);

    const user = accountRepo.create({
        email,
        password: hashed,
        nickname,
        role: Role.USER,
        registeredAt: new Date()
    });

    await accountRepo.save(user);
};