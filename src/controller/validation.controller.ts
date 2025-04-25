import {Request} from "express";
import {checkEmailDuplicate, checkNicknameDuplicate} from "../service/register.service";

export const checkEmailControl = async (req: Request,) : Promise<void> => {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
        throw new Error('이메일을 입력하세요.')
    }
    try {
        await checkEmailDuplicate(email);
    } catch(err){
        throw err;
    }
};

export const checkNicknameControl = async (req: Request,) : Promise<void> => {
    const { nickname } = req.body;

    if (!nickname || typeof nickname !== 'string') {
        throw new Error('닉네임을 입력하세요.')
    }
    try {
        await checkNicknameDuplicate(nickname);
    } catch(err){
        throw err;
    }

};