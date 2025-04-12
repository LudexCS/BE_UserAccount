import { JwtPayload } from "jsonwebtoken";
import { generatePayload, generateToken } from './jwt.service';
import { LoginDto } from "../dto/login.dto";
import { storeRefreshToken } from "../repository/redis.repository";
import { findByEmail } from "../repository/account.repository";
import { Role } from "../entity/account.entity";

export const login = async (loginDto: LoginDto): Promise<[string, string]> => {
    try {
        // login authentication
        const account = await findByEmail(loginDto.email);
        if (!account) {
            throw new Error(`Invalid email`);
        }
        const password = account.password;
        // 입력받은 비밀번호를 암호화해 저장된 비밀번호와 비교하는 작업. 회원가입 시 사용한 암호화 함수 적용
        // role : "USER" 대신 user.getRole()로 role을 가져올 예정
        const email: string = loginDto.email;
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