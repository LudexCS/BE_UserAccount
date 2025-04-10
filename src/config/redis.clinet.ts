import Redis from 'ioredis';

const redis = new Redis({
    host: 'redis',
    port: 6379,
    // password: process.env.REDIS_PASSWORD, // 필요 시
});

export default redis;