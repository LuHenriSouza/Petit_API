import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';

export const getById = async (id: number): Promise<IFincash | Error> => {
    try {
        const result = await Knex(ETableNames.fincashs)
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