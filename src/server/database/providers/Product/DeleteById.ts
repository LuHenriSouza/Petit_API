import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .where('id', '=', id)
            .del();

        if (result > 0) return;
        
        return new Error('Delete Failed');
    } catch (e) {
        console.log(e);
        return new Error('Delete Failed');
    }
};