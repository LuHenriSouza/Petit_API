import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISupplier } from '../../models';

export const updateById = async (id: number, supplier: Omit<ISupplier, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
    try {
        const deleted = await Knex(ETableNames.suppliers).select('id').where('id', id).andWhere('deleted_at', null).first();
        if (deleted) {
            const result = await Knex(ETableNames.suppliers)
                .update({
                    ...supplier,
                    updated_at: Knex.fn.now(),
                })
                .where('id', '=', id)
                .andWhere('deleted_at', null);

            if (result > 0) {
                return;
            }
        } else {
            return new Error('This Object has been deleted');
        }
    } catch (e) {
        console.log(e);
        return new Error('Update Failed');
    }
};
