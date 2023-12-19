import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';

export const updateById = async (id: number, fincash: Omit<IFincash, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.fincashs)
            .update({
                ...fincash,
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
