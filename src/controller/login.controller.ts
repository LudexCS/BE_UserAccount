import { Request } from 'express';
import { LoginDto } from "../dto/login.dto";
import { login } from "../service/login.service";

export const loginControl = async (req: Request): Promise<[string, string]> => {
    try {
        const loginDTO: LoginDto = req.body;

        return login(loginDTO);
    } catch (error) {
        throw error;
    }
};