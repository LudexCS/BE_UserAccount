import { deleteRefreshToken, isRefreshTokenEqual, storeRefreshToken } from "../repository/redis.repository";
import {generatePayload, generateToken, verifyToken} from './jwt.service';
import {JwtPayload} from "jsonwebtoken";

export const reissue = async (userId: string, token: string) :
    Promise<[string, string]> => {
    try {
        const isEqual = await isRefreshTokenEqual(userId, token);
        if (!isEqual) {
            throw new Error('Invalid refresh token');
        }

        await deleteRefreshToken(userId);

        const payload: JwtPayload = verifyToken(token);

        const accessPayload: JwtPayload = generatePayload("access", userId, payload.role);
        const refreshPayload: JwtPayload = generatePayload("refresh", userId, payload.role);

        const accessToken: string = generateToken(accessPayload);
        const refreshToken: string = generateToken(refreshPayload);

        await storeRefreshToken(userId, refreshToken);
        return [accessToken, refreshToken];
    } catch (error) {
        throw error;
    }
}