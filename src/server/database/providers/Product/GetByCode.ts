import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const getByCode = async (code: string): Promise<IProduct | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .select('*')
            .where('code', '=', code)
            .first();

        if (result) return result;

        return new Error('Get By ID Failed');
    } catch (e) {
        console.log(e);
        return new Error('Get By ID Failed');
    }
};