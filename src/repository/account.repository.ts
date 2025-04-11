import AppDataSource from '../config/mysql.config'
import {Account} from '../entity/account.entity';
import {Repository} from "typeorm";

const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findByEmail = async (email: string) => {
    return await accountRepo.findOne({where: {email}, select: ['password', 'role']});
}