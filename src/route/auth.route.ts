import { Router } from 'express';
import { Request, Response } from 'express';
import { loginControl } from "../controller/login.controller";
import {logoutControl} from "../controller/logout.controller";
import {reissueControl} from "../controller/reissue.controller";
import {getAccountControl} from "../controller/account.controller";
import {AccountDto} from "../dto/account.dto";

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

router.get('/get/account', async (req: Request, res: Response): Promise<void> => {
   try {
        const account: AccountDto = await getAccountControl(req);

        res.status(200).json(account);
   } catch (error) {
       if (error instanceof Error) {
           res.status(400).json({message: error.message});
       } else {
           res.status(500).json({message: "Server Error"});
       }
   }
});

export default router;