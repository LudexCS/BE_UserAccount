import dotenv from 'dotenv';
import app from './app';
import AppDataSource from './config/mysql.config';
import { startGrpcServer } from './grpc/auth.server';

dotenv.config();
const PORT = process.env.PORT;

async function connectAndStart() {
    let retries = 5;
    while (retries--) {
        try {
            await AppDataSource.initialize();
            console.log('📦 DB connected');

            await startGrpcServer();

            app.listen(PORT, () => {
                console.log(`UserAccount REST API running on port ${PORT}`);
            });
            break;
        } catch (error) {
            console.error('❌ DB 연결 실패:', error);
            if (retries === 0) {
                console.error('⛔️ 재시도 모두 실패. 앱 종료.');
                process.exit(1);
            }
            console.log('⏳ 3초 후 재시도...');
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
}

connectAndStart();
