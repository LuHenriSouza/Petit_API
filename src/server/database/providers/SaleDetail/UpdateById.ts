import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISale } from '../../models';

export const updateById = async (id: number, data: Omit<ISale, 'id' | 'created_at' | 'updated_at' | 'fincash_id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.sales)
            .update({
                ...data,
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
