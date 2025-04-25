import nodemailer from 'nodemailer';
import redis from "../config/redis.config";
import {VerifyEmailCodeDto} from "../dto/verifyEmailCode.dto";

export const sendVerificationEmail = async (email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expireTime = 600;

    const data = {
        code,
        expiresAt: Date.now() + expireTime * 1000
    }

    await redis.set(`email:${email}`, JSON.stringify(data), 'EX', expireTime);

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

export const verifyEmailCode = async (verifyEmailCodeDto: VerifyEmailCodeDto): Promise<boolean> => {
    const raw = await redis.get(`email:${verifyEmailCodeDto.email}`);
    if (!raw){
        throw new Error('이메일 정보 가져오기 실패');
    }

    const data = JSON.parse(raw);

    if (data.code !== verifyEmailCodeDto.code || data.expiresAt <= Date.now())
        return false;

    await redis.del(`email:${verifyEmailCodeDto.email}`);
    return true;
};