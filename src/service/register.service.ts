import { createAccount, isEmailDuplicate, isNicknameDuplicate } from '../repository/account.repository'
import {RegisterRequestDto} from "../dto/registerRequest.dto"
import bcrypt from 'bcrypt';

export const registerUser = async ( registerRequestDto: RegisterRequestDto
) => {
    try {
        const hashedPassword = await bcrypt.hash(registerRequestDto.password, 10);
        await createAccount(registerRequestDto.nickname, registerRequestDto.email, hashedPassword);
    }catch(err){
        throw err;
    }
};

export const checkEmailDuplicate = async (email: string) => {
    try {
        const exists = await isEmailDuplicate(email);
        if (exists) throw new Error('이미 사용 중인 이메일입니다.');
    }catch(err){
        throw err;
    }
};

export const checkNicknameDuplicate = async (nickname: string) => {
    try {
        const exists = await isNicknameDuplicate(nickname);
        if (exists) throw new Error('이미 사용 중인 닉네임입니다.');
    }catch(err){
        throw err;
    }
};