import {AccountDto} from "../dto/account.dto";
import {findByEmail} from "../repository/account.repository";
import {Account} from "../entity/account.entity";
import {CryptoWallet} from "../entity/crypto_wallet.entity";
import {findByUserId} from "../repository/crypto_wallet.repository";
import {CryptoWalletDto} from "../dto/cryptoWallet.dto";

export const findAccount = async (email: string): Promise<AccountDto> => {
    try {
        const account: Account = await findByEmail(email);
        const wallet: CryptoWallet[] = await findByUserId(account.id);
        const accountWallet: CryptoWalletDto[] = wallet.map(w => ({
            address: w.address,
            createdAt: w.registeredAt
        }));
        return {
            email: email,
            nickname: account.nickname,
            cryptoAddress: accountWallet
        };
    } catch (error) {
        throw error;
    }
};