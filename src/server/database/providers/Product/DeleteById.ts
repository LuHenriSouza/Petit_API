import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { randNumber } from '../../../shared/services';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const deleted = await Knex(ETableNames.products).select('id', 'code').where('id', id).andWhere('deleted_at', null).first();
        if (deleted) {
            await Knex(ETableNames.stocks).where('prod_id', id).del();
            const result = await Knex(ETableNames.products)
                .update({
                    code: deleted.code + 'D' + randNumber(20),
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