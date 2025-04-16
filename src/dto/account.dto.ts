import {CryptoWalletDto} from "./cryptoWallet.dto";

export interface AccountDto {
    email: string;
    nickname: string;
    cryptoWallet: CryptoWalletDto[];
}

export const toAccountDto = ( email: string, nickname: string, cryptoWallet: CryptoWalletDto[]): AccountDto => {
    return {
        email: email,
        nickname: nickname,
        cryptoWallet: cryptoWallet
    }
}