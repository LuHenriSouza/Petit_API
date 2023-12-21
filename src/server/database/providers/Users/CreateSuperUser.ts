import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const createSuperUser = async (): Promise<number | Error> => {

    const NAME = 'root';
    const EMAIL = 'root@root';
    const PASSWORD = '20032002l';


    try {
        const user = await Knex(ETableNames.users).select('id').where('email', EMAIL).first();

        if (!user) {

            const hashedPassword = await PasswordCrypto.hashPassword(PASSWORD);

            const [result] = await Knex(ETableNames.users)
                .insert({ name: NAME, email: EMAIL, password: hashedPassword })
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