import redis from "../config/redis.clinet";

export const storeRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
    const key = `refresh:${userId}`;
    const ttl = Number(process.env.REFRESH_EXP) || 60 * 60 * 24 * 7;

    try {
        await redis.set(key, refreshToken, 'EX', ttl);
    } catch (error) {
        console.error(`🔴 Redis 저장 실패: ${key}`, error);
        throw new Error('Failed to store refresh token');
    }
};

export const hasRefreshToken = async (userId: string): Promise<boolean> => {
    const key = `refresh:${userId}`;
    try {
        const exists = await redis.exists(key);
        return exists === 1;
    } catch (error) {
        console.error(`🔴 Redis 조회 실패: ${key}`, error);
        throw new Error('Failed to check refresh token');
    }
};

export const deleteRefreshToken = async (userId: string): Promise<void> => {
    const key = `refresh:${userId}`;
    try {
        await redis.del(key);
    } catch (error) {
        console.error(`🔴 Redis 삭제 실패: ${key}`, error);
        throw new Error('Failed to delete refresh token');
    }
};

export const isRefreshTokenEqual = async (userId: string, tokenToCompare: string): Promise<boolean> => {
    const key = `refresh:${userId}`;
    try {
        const storedToken = await redis.get(key);
        return storedToken === tokenToCompare;
    } catch (error) {
        console.error(`🔴 Redis 토큰 비교 실패: ${key}`, error);
        throw new Error('Failed to compare refresh token');
    }
};