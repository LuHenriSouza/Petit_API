import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPayment } from '../../models';

export const create = async (payment: Omit<IPayment, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.payments)
            .insert(payment)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;

        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Register Failed');
    } catch (e) {
        console.log(e);
        return new Error('Register Failed');
    }
};