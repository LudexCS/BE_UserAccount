import { hasRefreshToken, deleteRefreshToken } from "../repository/redis.repository";

export const logout = async (userId: string): Promise<void> => {
    try {
        const hasToken = await hasRefreshToken(userId);
        if (!hasToken) {
            throw new Error('No refresh token found');
        }

        await deleteRefreshToken(userId);
    } catch (error) {
        throw error;
    }
};