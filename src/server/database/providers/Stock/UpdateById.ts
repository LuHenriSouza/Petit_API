import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IStock } from '../../models';

export const updateById = async (id: number, stock: Omit<IStock, 'id' | 'created_at' | 'updated_at' | 'prod_id'>): Promise<void | Error> => {
    try {
        const product = await Knex(ETableNames.products).select('id').where('id', id).andWhere('deleted_at', null).first();
        if (product) {
            const result = await Knex(ETableNames.stocks)
                .update({
                    ...stock,
                    updated_at: Knex.fn.now(),
                })
                .where('prod_id', id);

            if (result > 0) {
                return;
            }
        } else {
            return new Error('Product not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Update Failed');
    }
};
