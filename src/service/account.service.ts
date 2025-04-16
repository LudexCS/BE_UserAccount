import {AccountDto, toAccountDto} from "../dto/account.dto";
import {deleteAccountByEmail, findByEmail} from "../repository/account.repository";
import {Account} from "../entity/account.entity";
import {CryptoWallet} from "../entity/crypto_wallet.entity";
import {findByUserId} from "../repository/crypto_wallet.repository";
import {CryptoWalletDto, toCryptoWalletDto} from "../dto/cryptoWallet.dto";

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
}