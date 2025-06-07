import {CryptoWalletDto} from "./cryptoWallet.dto";

export interface AccountDto {
    email: string;
    nickname: string;
    ownerId: string;
    cryptoWallet: CryptoWalletDto[];
}

export const toAccountDto = ( email: string, nickname: string, ownerId: string, cryptoWallet: CryptoWalletDto[]): AccountDto => {
    return {
        email: email,
        nickname: nickname,
        ownerId: ownerId,
        cryptoWallet: cryptoWallet
    }
}