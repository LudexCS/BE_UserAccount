import { Request, Response } from 'express';
import { deleteAccount } from '../services/account.service';

export async function deleteAccountController(req: Request, res: Response) {
    const { email } = req.body;

    await deleteAccount(email);
}