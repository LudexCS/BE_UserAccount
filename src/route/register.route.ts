import {Request, Response, Router} from "express";
import {
    completeRegisterControl,
    getVerifyEmailCodeControl,
    sendVerifyEmailControl
} from "../controller/register.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailRequestDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: 인증 코드를 받을 이메일
 *     VerifyEmailCodeDto:
 *       type: object
 *       required:
 *         - email
 *         - code
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: 인증할 이메일
 *         code:
 *           type: string
 *           description: 이메일로 받은 인증 코드
 *     RegisterRequestDto:
 *       type: object
 *       required:
 *         - nickname
 *         - email
 *         - password
 *         - repeatPassword
 *       properties:
 *         nickname:
 *           type: string
 *           minLength: 2
 *           maxLength: 10
 *           description: 사용자 닉네임 (2~10자)
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일
 *         password:
 *           type: string
 *           pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$'
 *           description: 비밀번호 (8~12자, 문자와 숫자 포함)
 *         repeatPassword:
 *           type: string
 *           description: 비밀번호 확인
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
 * /api/register/request:
 *   post:
 *     summary: 이메일 인증 코드 요청
 *     description: 회원가입을 위한 이메일 인증 코드를 요청합니다.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailRequestDto'
 *     responses:
 *       200:
 *         description: 인증 코드 발송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '인증 이메일 전송됨'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/request', async (req: Request, res: Response) => {
    try {
        await sendVerifyEmailControl(req);
        res.status(200).json({ message: '인증 이메일 전송됨' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

/**
 * @swagger
 * /api/register/verify:
 *   post:
 *     summary: 이메일 인증 코드 확인
 *     description: 받은 이메일 인증 코드의 유효성을 확인합니다.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailCodeDto'
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '이메일 인증 완료'
 *       400:
 *         description: 잘못된 인증 코드
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '인증 코드가 잘못되었거나 만료됨'
 */
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

/**
 * @swagger
 * /api/register/signup:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자 계정을 생성합니다.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequestDto'
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '회원가입 성공'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/signup', async (req: Request, res: Response) => {
    try {
        await completeRegisterControl(req);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

export default router;