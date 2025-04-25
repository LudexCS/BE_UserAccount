import AppDataSource from "../config/mysql.config";
import {CryptoWallet} from "../entity/crypto_wallet.entity";
import {Repository} from "typeorm";

const cryptoWalletRepo: Repository<CryptoWallet> = AppDataSource.getRepository(CryptoWallet);

export const findByUserId = async (userId: number): Promise<CryptoWallet[]> => {
    return await cryptoWalletRepo.find({where: {userId}});
};