import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const updateById = async (id: number, product: Omit<IProduct, 'id' | 'created_at' | 'updated_at' | 'code'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .update({
                ...product,
                updated_at: Knex.fn.now(),
            })
            .where('id', '=', id);

        if (result > 0) {
            return;
        }

        return new Error('Update Failed');
    } catch (e) {
        console.log(e);
        return new Error('Update Failed');
    }
};
