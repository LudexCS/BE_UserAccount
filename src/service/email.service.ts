import nodemailer from 'nodemailer';
import redis from "../config/redis.config";
import {registerRequestDto} from "../dto/registerRequest.dto";
import {verifyEmailCodeDto} from "../dto/verifyEmailCode.dto";

export const sendVerificationEmail = async (email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expireTime = 600;

    const data = {
        code,
        expiresAt: Date.now() + expireTime * 1000
    }

    await redis.set(`email:${email}`, JSON.stringify(data), { EX: expireTime });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: '이메일 인증 코드',
        html: `<h3>인증 코드: ${code}</h3>` ,
    });
};

export const setPendingUser = async (userData: registerRequestDto) => {
    const key = `email:${userData.email}`;
    const raw = await redis.get(key);
    if (!raw) throw new Error('이메일 인증 요청 먼저 해야 함');

    await redis.set(key, JSON.stringify(userData), { EX: 600 }); // 만료 다시 설정
};

export const verifyEmailCode = async (emailandCode: verifyEmailCodeDto): Promise<boolean> => {
    const raw = await redis.get(`email:${emailandCode.email}`);
    if (!raw) return false;

    const data = JSON.parse(raw);

    if (data.code !== emailandCode.code || data.expiresAt <= Date.now())
        return false;

    return true;
};

export const getVerifiedUserData = async (email: string) => {
    const raw = await redis.get(`email:${email}`);
    if (!raw) {
        throw new Error('해당 이메일에 대한 인증 데이터가 존재하지 않습니다.');
    }
    try {
        const data = JSON.parse(raw);
        return data;
    } catch (e) {
        throw new Error('저장된 인증 데이터를 파싱하는 데 실패했습니다.');
    }
};