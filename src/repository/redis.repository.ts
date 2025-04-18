import redis from "../config/redis.config";

export const storeRefreshToken = async (email: string, refreshToken: string): Promise<void> => {
    const key = `refresh:${email}`;
    const ttl = Number(process.env.REFRESH_EXP);

    try {
        await redis.set(key, refreshToken, 'EX', ttl);
    } catch (error) {
        console.error(`🔴 Redis 저장 실패: ${key}`, error);
        throw new Error('Failed to store refresh token');
    }
};

export const hasRefreshToken = async (email: string): Promise<boolean> => {
    const key = `refresh:${email}`;
    try {
        const exists = await redis.exists(key);
        return exists === 1;
    } catch (error) {
        console.error(`🔴 Redis 조회 실패: ${key}`, error);
        throw new Error('Failed to check refresh token');
    }
};

export const deleteRefreshToken = async (email: string): Promise<void> => {
    const key = `refresh:${email}`;
    try {
        await redis.del(key);
    } catch (error) {
        console.error(`🔴 Redis 삭제 실패: ${key}`, error);
        throw new Error('Failed to delete refresh token');
    }
};

export const isRefreshTokenEqual = async (email: string, tokenToCompare: string): Promise<boolean> => {
    const key = `refresh:${email}`;
    try {
        const storedToken = await redis.get(key);
        return storedToken === tokenToCompare;
    } catch (error) {
        console.error(`🔴 Redis 토큰 비교 실패: ${key}`, error);
        throw new Error('Failed to compare refresh token');
    }
};