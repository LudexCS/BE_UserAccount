import {CryptoWalletDto} from "./cryptoWallet.dto";

export interface AccountDto {
    email: string;
    nickname: string;
    cryptoAddress: CryptoWalletDto[];
}