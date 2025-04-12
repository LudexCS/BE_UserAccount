import { createAccount, isEmailDuplicate, isNicknameDuplicate } from '../repository/account.repository'

export const registerUser = async (
    { email, password, nickname } : { email: string, password: string, nickname: string}
) => {
        await createAccount(email, password, nickname);
};

export const checkEmailDuplicate = async (email: string) => {
    const exists = await isEmailDuplicate(email);
    if (exists) throw new Error('이미 사용 중인 이메일입니다.');
};

export const checkNicknameDuplicate = async (nickname: string) => {
    const exists = await isNicknameDuplicate(nickname);
    if (exists) throw new Error('이미 사용 중인 닉네임입니다.');
};