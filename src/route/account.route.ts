import {Request, Response, Router} from "express";
import {AccountDto} from "../dto/account.dto";
import {deleteAccountControl, getAccountControl} from "../controller/account.controller";

const router: Router = Router();

router.get('/get', async (req: Request, res: Response): Promise<void> => {
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

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        await deleteAccountControl(req);
        res.status(200).json({ message: '계정 삭제 완료' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;