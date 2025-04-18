import {Request, Response, Router} from "express";
import {
    completeRegisterControl,
    getVerifyEmailCodeControl,
    sendVerifyEmailControl
} from "../controller/register.controller";

const router: Router = Router();

router.post('/request', async (req: Request, res: Response) => {
    try {
        await sendVerifyEmailControl(req);
        res.status(200).json({ message: '인증 이메일 전송됨' });
    } catch (err) {
        res.status(500).json({ message: '인증 요청 실패' });
    }
});

router.post('/verify', async (req: Request, res: Response): Promise<void> => {
    try {
        const verified = await getVerifyEmailCodeControl(req);
        if (!verified) {
            return void res.status(400).json({ message: '인증 코드가 잘못되었거나 만료됨' });
        }
        res.status(200).json({ message: '이메일 인증 완료' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
        await completeRegisterControl(req);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;