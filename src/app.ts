import express, { Express } from 'express';
import authRoute from './route/auth.route';
import jwtGuard from "./middleware/jwt.guard";
import cookieParser from 'cookie-parser';

const app : Express = express();
app.use(express.json());
app.use(cookieParser());

// '/api/protected/*'이면 인증 미들웨어를 거침
app.use('/api/protected', jwtGuard);

// '/api/auth/*'(/login, /logout, /reissue)의 경우 인증이 불필요하기에 제외
app.use('/api/auth', authRoute);

export default app;