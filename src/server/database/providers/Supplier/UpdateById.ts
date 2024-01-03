import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISupplier } from '../../models';

export const updateById = async (id: number, supplier: Omit<ISupplier, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .update(supplier)
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
