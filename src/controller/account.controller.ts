import {Request} from 'express';
import {findAccount} from "../service/account.service";

export const getAccountControl = async(req: Request) => {
    try {
        const email = req.user;
        if (!email) {
            throw new Error("email doesn't exist, check your token");
        }
        return await findAccount(email);
    } catch (error) {
        throw error;
    }
};