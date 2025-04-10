import { Request } from 'express';
import { verifyToken } from "../service/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import {reissue} from "../service/reissue.service";

export const reissueControl = async (req: Request): Promise<[string, string]> => {

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

        return await reissue(userId, token);;
    } catch (error) {
        throw error;
    }
};