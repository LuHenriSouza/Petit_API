import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const getAll = async (page: number, limit: number, filter: string): Promise<IProduct[] | Error> => {
    try {
        const result = await Knex(ETableNames.suppliers)
            .select('*')
            .where('name', 'ilike', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('id', 'desc');

        return result;
    } catch (e) {
        console.log(e);
        return new Error('Get All Failed');
    }
};