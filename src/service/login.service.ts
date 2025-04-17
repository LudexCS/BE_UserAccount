import { JwtPayload } from "jsonwebtoken";
import { generatePayload, generateToken } from './jwt.service';
import { LoginDto } from "../dto/login.dto";
import { storeRefreshToken } from "../repository/redis.repository";
import { findByEmail } from "../repository/account.repository";
import { Role } from "../entity/account.entity";
import bcrypt from "bcrypt";

export const login = async (loginDto: LoginDto): Promise<[string, string]> => {
    try {
        // login authentication
        const email: string = loginDto.email;
        const account = await findByEmail(email);
        const hashedPassword = account.password;
        const isMatch = await bcrypt.compare(loginDto.password, hashedPassword)
        if (!isMatch) {
            throw new Error('Incorrect email or password');
        }
        const role: Role = account.role;

        const accessPayload: JwtPayload = generatePayload("access", email, role);
        const refreshPayload: JwtPayload = generatePayload("refresh", email, role);

        const accessToken: string = generateToken(accessPayload);
        const refreshToken: string = generateToken(refreshPayload);

        await storeRefreshToken(email, refreshToken);
        return [accessToken, refreshToken];
    } catch (error) {
        throw error;
    }
};