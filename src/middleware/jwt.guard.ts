import { Request, Response, NextFunction } from 'express';
import { isAuthenticated } from '../service/jwt.service'

const jwtGuard = (req: Request, res: Response, next: NextFunction): void => {
    const jwtHeader: string | undefined = req.headers.authorization;

    if (!jwtHeader || !jwtHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
    }

    const token = jwtHeader.split(' ')[1];

    try {
        isAuthenticated(token);
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
        return;
    }
};

export default jwtGuard;