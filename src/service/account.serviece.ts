import { deleteAccountByEmail } from '../repository/account.repository';

export async function deleteAccount(email: string): Promise<void> {
    try {
        await deleteAccountByEmail(email);
    }catch(err){
        throw err;
    }
}