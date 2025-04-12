import { Router } from 'express';
import { loginControl } from "../controller/login.controller";
import { Request, Response } from 'express';
import {logoutControl} from "../controller/logout.controller";
import {reissueControl} from "../controller/reissue.controller";
import { registerRequest, registerVerify, completeRegistration } from '../controller/register.controller';
import { checkEmail, checkNickname } from '../controller/register.controller';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const [accessToken, refreshToken]: [string, string] = await loginControl(req);

        // 쿠키에 refreshToken 설정
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,          // 자바스크립트에서 접근 불가 (XSS 방어)
            secure: process.env.NODE_ENV === 'production',            // HTTPS 에서만 전송, 배포 시에는 true로 교체
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',      // CSRF 방지
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 (ms 단위)
        });

        // 헤더에 accessToken 설정
        res.setHeader('authorization', `Bearer ${accessToken}`);

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
});

router.delete('/logout', async (req: Request, res: Response): Promise<void> => {
    try {
        await logoutControl(req);

        // 쿠키 삭제
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
});

router.post('/reissue', async (req: Request, res: Response): Promise<void> => {
    try {
        const [accessToken, refreshToken]: [string, string] = await reissueControl(req);

        // 쿠키에 refreshToken 설정
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,          // 자바스크립트에서 접근 불가 (XSS 방어)
            secure: process.env.NODE_ENV === 'production',            // HTTPS 에서만 전송, 배포 시에는 true로 교체
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',      // CSRF 방지
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 (ms 단위)
        });

        // 헤더에 accessToken 설정
        res.setHeader('authorization', `Bearer ${accessToken}`);

        res.status(200).json({ message: 'Reissue successful' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
});

router.post('/register-request', async (req: Request, res: Response) => {
    try {
        await registerRequest(req, res);
        res.status(200).json({ message: '인증 이메일 전송됨' });
    } catch (err) {
        res.status(500).json({ message: '인증 요청 실패' });
    }
});

router.post('/register-verify', async (req: Request, res: Response): Promise<void> => {
    try {
        const verified = await registerVerify(req, res);
        if (!verified) {
            return void res.status(400).json({ message: '인증 코드가 잘못되었거나 만료됨' });
        }
        res.status(200).json({ message: '이메일 인증 완료' });
    } catch (err) {
        res.status(500).json({ message: '서버 오류' });
    }
});

router.post('/register-complete', async (req: Request, res: Response) => {
    try {
        await completeRegistration(req, res);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/check-email', async (req: Request, res: Response) => {
    try {
        await checkEmail(req, res);
        res.status(200).json({ message: '사용 가능한 이메일입니다.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/check-nickname', async (req: Request, res: Response) => {
    try {
        await checkNickname(req, res);
        res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export default router;