import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const create = async (product: Omit<IProduct, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.products)
            .insert(product)
            .returning('id');

        if (typeof result === 'object') {
            await Knex(ETableNames.stocks).insert({ prod_id: result.id, stock: 0 });
            return result.id;

        } else if (typeof result === 'number') {
            await Knex(ETableNames.stocks).insert({ prod_id: result, stock: 0 });
            return result;
        }

        return new Error('Register Failed');
    } catch (e) {
        console.log(e);
        return new Error('Register Failed');
    }
};