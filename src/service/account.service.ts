import {AccountDto, toAccountDto} from "../dto/account.dto";
import {Request, Response} from "express";
import {deleteAccountByEmail, findByEmail, findIdByEmail, updateAccountFields} from "../repository/account.repository";
import {Account, toAccountEntity} from "../entity/account.entity";
import {CryptoWallet} from "../entity/crypto_wallet.entity";
import {findByUserId} from "../repository/crypto_wallet.repository";
import {CryptoWalletDto, toCryptoWalletDto} from "../dto/cryptoWallet.dto";
import {AccountEditDto} from "../dto/accontEdit.dto";

export const findAccount = async (email: string): Promise<AccountDto> => {
    try {
        const account: Account = await findByEmail(email);
        const wallet: CryptoWallet[] = await findByUserId(account.id);
        const accountWallet: CryptoWalletDto[] = wallet.map(w =>
            toCryptoWalletDto(w.address, w.registeredAt));
        return toAccountDto(email, account.nickname, accountWallet);
    } catch (error) {
        throw error;
    }
};

export async function deleteAccount(email: string): Promise<void> {
    try {
        await deleteAccountByEmail(email);
    }catch(err){
        throw err;
    }
};

export const updateUserData = async (req: Request, res: Response) => {
    const email = req.user as string;
    const dto = req.body as AccountEditDto;
    const userId = await findIdByEmail(email);
    if (!userId) throw new Error("User not found");

    const partialUser = toAccountEntity(dto);
    if (Object.keys(partialUser).length === 0) return;

    await updateAccountFields(userId, partialUser);
};