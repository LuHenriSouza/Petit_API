import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const deleted = await Knex(ETableNames.products).select('id').where('id', id).andWhere('deleted_at', null).first();
        if (deleted) {
            const result = await Knex(ETableNames.products)
                .update({
                    deleted_at: Knex.fn.now(),
                })
                .where('id', '=', id);

            if (result > 0) return;

            return new Error('Delete Failed');
        } else {
            return new Error('This Object has already been deleted');
        }
    } catch (e) {
        console.log(e);
        return new Error('Delete Failed');
    }
};