import { Request } from 'express';
import { logout } from "../service/logout.service";
import { verifyToken } from "../service/jwt.service";
import { JwtPayload } from "jsonwebtoken";

export const logoutControl = async (req: Request): Promise<void> => {
    try {
        const token = req.cookies.refreshToken || req.headers['x-refresh-token'];

        if (!token) {
            throw new Error('No refresh token provided');
        }

        const payload: JwtPayload = verifyToken(token);
        const userId: string | undefined = payload.sub;
        if (typeof userId !== 'string' || !userId.trim()) {
            throw new Error('Unexpected token type: expected object payload');
        }
        await logout(userId);
    } catch (error) {
        throw error;
    }
};