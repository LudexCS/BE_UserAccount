import {JwtPayload} from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

import { Request, Response, NextFunction } from 'express';
import {verifyToken} from '../service/jwt.service';

const jwtGuard = (req: Request, res: Response, next: NextFunction): void => {
    const jwtHeader: string | undefined = req.headers.authorization;

    if (!jwtHeader || !jwtHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
    }

    const token = jwtHeader.split(' ')[1];

    try {
        const payload: JwtPayload = verifyToken(token);
        const email = payload.sub;
        if (!email) {
            res.status(401).json({ message: 'Missing or invalid email in JWT' });
            return;
        }
        // req.user 필드에 email 정보를 추가. 이제 req.user로 email을 받아올 수 있음
        req.user = email;
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
        return;
    }
};

export default jwtGuard;