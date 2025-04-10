import jwt, { JwtPayload } from 'jsonwebtoken';
import {JwtPayloadDto} from "../dto/jwtPayload.dto";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXP = Number(process.env.ACCESS_EXP) || 60 * 5;
const REFRESH_EXP = Number(process.env.REFRESH_EXP) || 60 * 60 * 24 * 7;

export const generatePayload = (category: "access" | "refresh", userId: string, role: "USER" | "ADMIN"): JwtPayload => {
    const now = Math.floor(Date.now() / 1000); // current time
    const payload: JwtPayloadDto = {
        category,
        iss: "ludex.io",
        sub: userId,
        role,
        iat: now,
        nbf: now,
        exp: category === "access" ? now + ACCESS_EXP : now + REFRESH_EXP
    };
    return payload;
};

export const generateToken = (payload: JwtPayload): string => {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string): JwtPayload => {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    try {
        const decoded: string|JwtPayload = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            throw new Error('Unexpected token type: expected object payload');
        }
        return decoded as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const isAuthenticated = (token?: string): boolean => {
    if (!token) return false;
    try {
        verifyToken(token);
        return true;
    } catch (error) {
        throw error;
    }
};
