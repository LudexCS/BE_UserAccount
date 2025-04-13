import AppDataSource from '../config/mysql.config;
import { Account } from '../entity/account.entity';
import { deleteAccountByEmail } from '../repositories/account.repository';

export const deleteUserAccount = async (userId: number, email: string): Promise<void> => {
    const accountRepo = AppDataSource.getRepository(Account);

    const user = await accountRepo.findOne({ where: { id: userId }});

    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }

    if (user.email !== email) {
        throw new Error('이메일이 일치하지 않습니다.');
    }

    // 계정 삭제
    await accountRepo.delete({ id: userId });
};

export async function deleteAccount(email: string): Promise<void> {
    await deleteAccountByEmail(email);
}