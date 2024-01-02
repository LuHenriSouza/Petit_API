import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISale } from '../../models';

export const getById = async (id: number): Promise<ISale | Error> => {
    try {
        const result = await Knex(ETableNames.sales)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;
        console.log('Error:');
        console.log(result);
        return new Error('Get By ID Failed NUM TA');
    } catch (e) {
        console.log(e);
        return new Error('Get By ID Failed NUM TA');
    }
};