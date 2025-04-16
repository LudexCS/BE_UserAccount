import { Request, Response } from 'express';
import { deleteAccount} from "../service/account.serviece";

export async function deleteAccountControl(req: Request, res: Response) {
    const email = req.user;
    try{
        await deleteAccount(email);
    }catch(err){
        throw err;
    }
}