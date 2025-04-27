import {Request, Response, Router} from "express";
import {checkEmailControl, checkNicknameControl} from "../controller/validation.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailValidationDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: 중복 검사할 이메일
 *     NicknameValidationDto:
 *       type: object
 *       required:
 *         - nickname
 *       properties:
 *         nickname:
 *           type: string
 *           description: 중복 검사할 닉네임
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
 * /api/validation/email:
 *   post:
 *     summary: 이메일 중복 검사
 *     description: 입력한 이메일의 사용 가능 여부를 확인합니다.
 *     tags: [Validation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailValidationDto'
 *     responses:
 *       200:
 *         description: 사용 가능한 이메일
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: '사용 가능한 이메일입니다.'
 *       400:
 *         description: 사용 불가능한 이메일
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: '이미 사용 중인 이메일입니다.'
 */
router.post('/email', async (req: Request, res: Response) => {
    try {
        await checkEmailControl(req);
        res.status(200).json({ message: '사용 가능한 이메일입니다.' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

/**
 * @swagger
 * /api/validation/nickname:
 *   post:
 *     summary: 닉네임 중복 검사
 *     description: 입력한 닉네임의 사용 가능 여부를 확인합니다.
 *     tags: [Validation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NicknameValidationDto'
 *     responses:
 *       200:
 *         description: 사용 가능한 닉네임
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: '사용 가능한 닉네임입니다.'
 *       400:
 *         description: 사용 불가능한 닉네임
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               message: '이미 사용 중인 닉네임입니다.'
 */
router.post('/nickname', async (req: Request, res: Response) => {
    try {
        await checkNicknameControl(req);
        res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;