import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
    try {
        const exists = await Knex(ETableNames.users).select('id').where('email', user.email).first();

        if (!exists) {
            const hashedPassword = await PasswordCrypto.hashPassword(user.password);

            const [result] = await Knex(ETableNames.users)
                .insert({ ...user, password: hashedPassword })
                .returning('id');

            if (typeof result === 'object') {
                return result.id;

            } else if (typeof result === 'number') {
                return result;
            }

            return new Error('Register Failed');
        } else {
            return Error('An account with this Email already exists');
        }
    } catch (e) {
        console.log(e);
        return new Error('Register Failed');
    }
};