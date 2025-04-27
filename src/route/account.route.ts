import {Request, Response, Router} from "express";
import {AccountDto} from "../dto/account.dto";
import {deleteAccountControl, getAccountControl} from "../controller/account.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     CryptoWalletDto:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *           description: 암호화폐 지갑 주소
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 지갑 생성 시간
 *     AccountDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         cryptoWallet:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CryptoWalletDto'
 *           description: 사용자의 암호화폐 지갑 목록
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 응답 메시지
 */
const router: Router = Router();

/**
 * @swagger
 * /api/protected/account/get:
 *   get:
 *     summary: 계정 정보 조회
 *     description: 현재 로그인된 사용자의 계정 정보를 조회합니다.
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 계정 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountDto'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: 인증되지 않은 요청
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
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

/**
 * @swagger
 * /api/protected/account/delete:
 *   delete:
 *     summary: 계정 삭제
 *     description: 현재 로그인된 사용자의 계정을 삭제합니다.
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 계정 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: 인증되지 않은 요청
 */
router.delete('/delete', async (req: Request, res: Response) => {
    try {
        await deleteAccountControl(req);
        res.status(200).json({ message: '계정 삭제 완료' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;