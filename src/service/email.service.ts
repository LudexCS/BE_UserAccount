import nodemailer from 'nodemailer';

const pendingUsers = new Map<string, any>();

export const sendVerificationEmail = async (email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    pendingUsers.set(email, { code, expiresAt: Date.now() + 600_000 }); // 10분

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

export const setPendingUser = (email: string, data: any) => {
    const entry = pendingUsers.get(email);
    if (!entry) throw new Error('이메일 인증 요청 먼저 해야 함');
    pendingUsers.set(email, { ...entry, ...data });
};

export const verifyEmailCode = (email: string, code: string): boolean => {
    const entry = pendingUsers.get(email);
    return entry && entry.code === code && entry.expiresAt > Date.now();
};

export const getVerifiedUserData = (email: string) => {
    return pendingUsers.get(email);
};