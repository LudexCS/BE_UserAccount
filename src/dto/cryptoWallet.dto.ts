export interface CryptoWalletDto {
    address: string;
    createdAt: Date;
}

export const toCryptoWalletDto = (address: string, createdAt: Date): CryptoWalletDto => {
    return {
        address,
        createdAt
    };
};