import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICashOutflow } from '../../models';

export const getById = async (id: number): Promise<ICashOutflow | Error> => {
    try {
        const result = await Knex(ETableNames.cashOutflows)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;

        return new Error('Get By ID Failed');
    } catch (e) {
        console.log(e);
        return new Error('Get By ID Failed');
    }
};