import dotenv from 'dotenv';
import app from './app';
import AppDataSource from './config/mysql.config';

// .env 환경변수 사용 setting
dotenv.config();

const PORT = process.env.PORT;

// DB 연결
AppDataSource.initialize()
    .then((): void => {
        console.log('📦 DB connected');
        // 서버 실행
        app.listen(PORT, () : void => {
            console.log(`UserAccount service running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('DB 연결 실패:', error));

