import {Request, Response, Router} from "express";
import {checkEmailControl, checkNicknameControl} from "../controller/validation.controller";

const router: Router = Router();

router.post('/email', async (req: Request, res: Response) => {
    try {
        await checkEmailControl(req);
        res.status(200).json({ message: '사용 가능한 이메일입니다.' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

router.post('/nickname', async (req: Request, res: Response) => {
    try {
        await checkNicknameControl(req);
        res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;