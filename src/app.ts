import express, { Express } from 'express';
import authRoute from './route/auth.route';
import accountRoute from "./route/account.route";
import registerRoute from "./route/register.route";
import validationRoute from "./route/validation.route";
import jwtGuard from "./middleware/jwt.guard";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';

const app : Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ["authorization", "set-cookie"]
}));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));


// '/api/protected/*'이면 인증 미들웨어를 거침
app.use('/api/protected', jwtGuard);

// '/api/auth/*'(/login, /logout, /reissue)의 경우 인증이 불필요하기에 제외
app.use('/api/auth', authRoute);
app.use('/api/protected/account', accountRoute);
app.use('/api/register', registerRoute);
app.use('/api/validation', validationRoute);

export default app;