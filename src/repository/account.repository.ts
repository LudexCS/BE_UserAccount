import AppDataSource from '../config/mysql.config'
import { Account } from '../entity/account.entity';
import { Repository } from "typeorm";

const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findByEmail = async (email: string): Promise<Account> => {
    const account = await accountRepo.findOne({ where: {email} });
    if (!account) {
        throw new Error(`Invalid email`);
    }
    return account;
};

export const findIdByEmail = async (email: string) => {
    const account = await accountRepo.findOne({where: {email}, select: ['id']});
    if (!account) {
        throw new Error(`Account with email ${email} not found`);
    }
    return account.id;
};