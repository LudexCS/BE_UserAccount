import AppDataSource from '../config/mysql.config;
import { Account } from '../entity/account.entity';
import { deleteAccountByEmail } from '../repositories/account.repository';

export async function deleteAccount(email: string): Promise<void> {
    await deleteAccountByEmail(email);
}