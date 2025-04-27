import { Router } from 'express';
import { Request, Response } from 'express';
import { loginControl } from "../controller/login.controller";
import { logoutControl } from "../controller/logout.controller";
import { reissueControl } from "../controller/reissue.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
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
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     description: 이메일과 비밀번호로 로그인합니다. 성공 시 Authorization 헤더에 access token과 쿠키에 refresh token이 설정됩니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: Bearer access token
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: refreshToken=token; HttpOnly
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
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
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

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: 로그아웃
 *     description: 로그아웃을 수행하고 refresh token 쿠키를 제거합니다.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
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
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *
 */
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

/**
 * @swagger
 * /api/auth/reissue:
 *   get:
 *     summary: 토큰 재발급
 *     description: Refresh token을 사용하여 새로운 access token과 refresh token을 발급받습니다.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 토큰 재발급 성공
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: Bearer access token
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: refreshToken=token; HttpOnly
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
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/reissue', async (req: Request, res: Response): Promise<void> => {
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

export default router;