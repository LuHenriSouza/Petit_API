import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICashOutflow } from '../../models';

export const create = async (cashOutflow: Omit<ICashOutflow, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
        const fincash = await Knex(ETableNames.fincashs)
            .select('*')
            .where('id', cashOutflow.fincash_id)
            .first();

        if (!fincash) return new Error('Fincash not found');
        if (fincash.isFinished) return new Error('This Fincash already closed');
        if (fincash.deleted_at) return new Error('This Fincash has been deleted');

        const [result] = await Knex(ETableNames.cashOutflows)
            .insert(cashOutflow)
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