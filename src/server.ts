import dotenv from 'dotenv';
import app from './app';

// .env 환경변수 사용 setting
dotenv.config();

const PORT : string|3000 = process.env.PORT || 3000;
app.listen(PORT, () : void => {
    console.log(`UserAccount service running on port ${PORT}`);
});