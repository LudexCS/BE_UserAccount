import AppDataSource from '../config/mysql.config;
import { deleteAccountByEmail } from '../repositories/account.repository';

export async function deleteAccount(email: string): Promise<void> {
    await deleteAccountByEmail(email);
}