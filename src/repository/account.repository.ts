import AppDataSource from '../config/mysql.config'
import { Account, Role } from '../entity/account.entity';
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findByEmail = async (email: string): Promise<Account> => {
    const account = await accountRepo.findOne({ where: {email} });
    if (!account) {
        throw new Error(`Incorrect email or password`);
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

export const createAccount = async ( nickname: string, email: string, password: string ) => {

    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = accountRepo.create({
            email: email,
            password: hashed,
            nickname: nickname,
            role: Role.USER,
            registeredAt: new Date()
        })
        await accountRepo.save(user)
        console.log('Saved ID:', user.id);
    } catch(err){
        console.error('❌ 유저 저장 실패:', err);
        throw err;
    }
}

export const isNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    const existing = await accountRepo.findOne({ where: { nickname: nickname } });
    return !!existing;
};

export const isEmailDuplicate = async (email: string): Promise<boolean> => {
    const existing = await accountRepo.findOne({ where: { email } });
    console.log(existing);
    return !!existing;
};

export async function deleteAccountByEmail(email: string): Promise<void> {
    const account = await accountRepo.findOne({ where: { email } });
    if (!account) {
        throw new Error('계정이 없습니다.');
    }

    await accountRepo.delete({ id: account.id });
};

export const updateAccountFields = async (
    userId: number,
    partialUpdate: Partial<Account>
): Promise<void> => {
    try {
        await accountRepo.update({ id: userId }, partialUpdate);
    } catch (error) {
        console.error("Failed to update user fields:", error);
        throw new Error("Failed to update user fields in database");
    }
};