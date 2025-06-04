import nodemailer from 'nodemailer';
import redis from "../config/redis.config";
import {VerifyEmailCodeDto} from "../dto/verifyEmailCode.dto";

function createAuthCode(): string {
    const CODE_LENGTH = 6;
    const code: string[] = [];

    for (let i = 0; i < CODE_LENGTH; i++) {
        const edge = Math.floor(Math.random() * 2); // 0 또는 1

        if (edge === 0) {
            // 숫자 (0~9)
            code.push(String.fromCharCode('0'.charCodeAt(0) + Math.floor(Math.random() * 10)));
        } else {
            // 대문자 알파벳 (A~Z)
            code.push(String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 26)));
        }
    }

    return code.join('');
}

export const sendVerificationEmail = async (email: string) => {
    const code = createAuthCode();
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

    const purpose = "이메일 인증";
    const now = new Date();
    const expiresAtDate = new Date(now.getTime() + 5 * 60 * 1000); // 현재 + 5분

    const pad = (n: number) => n.toString().padStart(2, '0');

    const expiresAt = `${expiresAtDate.getFullYear()}-${pad(expiresAtDate.getMonth() + 1)}-${pad(expiresAtDate.getDate())} ` +
        `${pad(expiresAtDate.getHours())}:${pad(expiresAtDate.getMinutes())}`;

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: '[Ludex] 이메일 인증 코드',
        html: `
            <html>
              <body style="font-family: 'Apple SD Gothic Neo', Arial, sans-serif; background-color: #f6f6f6; padding: 40px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 40px; text-align: center;">
                  
                  <h2 style="color: #2D6FF2; font-size: 28px; font-weight: bold; margin-bottom: 30px;">Ludex</h2>
            
                  <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
                    <strong>Ludex ${purpose}</strong>을 위해 인증번호를 보내드려요.<br/>이메일 인증 화면에서 아래의 인증 번호를 입력하고 인증을 완료해주세요.
                  </p>
                  
                  <p style="font-size: 32px; font-weight: bold; color: #2D6FF2; letter-spacing: 4px; margin: 30px auto;">${code}</p>
                  
                  <p style="color: #999; font-size: 14px; margin-bottom: 4px;">이 인증번호는 5분 후 만료됩니다.</p>
                  <p style="color: #999; font-size: 14px; margin-bottom: 30px;">만료 시간: ${expiresAt}</p>
                  
                  <p style="color: #555; font-size: 14px; line-height: 1.6;">
                    혹시 요청하지 않은 인증 메일을 받으셨나요?<br/>
                    누군가 실수로 메일 주소를 잘못 입력했을 수 있어요. 계정이 도용된 것은 아니니 안심하세요.<br/>
                    직접 요청한 인증 메일이 아닌 경우 무시해주세요.
                  </p>
                  
                  <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
                  
                  <p style="color: #666; font-size: 13px;">이 메일은 발신 전용 메일이에요.</p>
                  <p style="color: #777; font-size: 11px;">Copyright © Ludex All rights reserved.</p>
                </div>
              </body>
            </html>
            `,
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