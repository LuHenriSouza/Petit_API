import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISupplier } from '../../models';

export const getById = async (id: number): Promise<ISupplier | Error> => {
    try {
        const result = await Knex(ETableNames.suppliers)
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