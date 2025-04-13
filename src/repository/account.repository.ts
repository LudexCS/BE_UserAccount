import AppDataSource from '../config/mysql.config'
import {Account, Role} from '../entity/account.entity';
import {Repository} from "typeorm";
import bcrypt from "bcrypt";

const accountRepo: Repository<Account> = AppDataSource.getRepository(Account);

export const findByEmail = async (email: string) => {
    return await accountRepo.findOne({where: {email}, select: ['password', 'role']});
}

export const createAccount = async (
    email: string,
    password: string,
    nickname: string
) => {

    const hashed = await bcrypt.hash(password, 10);

    const user = accountRepo.create({
        email,
        password: hashed,
        nickname,
        role: Role.USER,
        registeredAt: new Date()
    })

    await accountRepo.save(user)
}

export const isNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    const existing = await accountRepo.findOne({ where: { nickname: nickname } });
    return !!existing;
};

export const isEmailDuplicate = async (email: string): Promise<boolean> => {
    const existing = await accountRepo.findOne({ where: { email } });
    return !!existing;
};

export async function deleteAccountByEmail(email: string): Promise<void> {
    const account = await accountRepo.findOne({
        where: { email },
    });

    if (!account) {
        throw new Error('계정이 없습니다.');
    }

    await accountRepo.delete({ id: account.id });
}