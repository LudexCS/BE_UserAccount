import { JwtPayload } from "jsonwebtoken";
import { generatePayload, generateToken } from './jwt.service';
import { LoginDto } from "../dto/login.dto";
import {storeRefreshToken} from "../repository/redis.repository";

export const login = async (loginDto: LoginDto): Promise<[string, string]> => {
    try {
        // login authentication ~~
        // role : "USER" 대신 user.getRole()로 role을 가져올 예정
        const userId = loginDto.userId;
        const role: "USER" | "ADMIN" = "USER";

        const accessPayload: JwtPayload = generatePayload("access", loginDto.userId, role);
        const refreshPayload: JwtPayload = generatePayload("refresh", loginDto.userId, role);

        const accessToken: string = generateToken(accessPayload);
        const refreshToken: string = generateToken(refreshPayload);

        await storeRefreshToken(userId, refreshToken);
        return [accessToken, refreshToken];
    } catch (error) {
        throw error;
    }
};