import { Request, Response } from 'express';
import {
    sendVerificationEmail,
    setPendingUser,
    verifyEmailCode,
    getVerifiedUserData,
} from '../service/email.service';
import { registerUser } from '../service/user.service';

export const registerRequest = async (req: Request, res: Response) => {
    const { name, email, password, walletAddress } = req.body;

    try {
        await sendVerificationEmail(email);
        setPendingUser(email, { name, password, walletAddress });
        res.status(200).json({ message: '인증 이메일 전송됨' });
    } catch (err) {
        res.status(500).json({ message: '인증 요청 실패' });
    }
};

export const registerVerify = async (req: Request, res: Response): Promise<void> => {
    const { email, code } = req.body;

    if (!verifyEmailCode(email, code)) {
        res.status(400).json({ message: '인증 코드가 잘못되었거나 만료됨' });
    }

    const userData = getVerifiedUserData(email);
    await registerUser(userData);
    res.status(201).json({ message: '회원가입 성공' });
};