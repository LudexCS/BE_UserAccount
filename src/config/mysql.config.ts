import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Account } from '../entity/account.entity'; // 엔티티 경로에 맞게 설정

const HOST = process.env.DB_HOST || 'localhost';
const PORT = Number(process.env.DB_PORT) || 3306;
const USER_NAME = process.env.DB_USER_NAME || 'username';
const PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME;

const AppDataSource = new DataSource({
    type: 'mysql',
    host: HOST,
    port: PORT,
    username: USER_NAME,
    password: PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [ Account, ],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;