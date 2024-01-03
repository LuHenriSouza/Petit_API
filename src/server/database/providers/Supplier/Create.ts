import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISupplier } from '../../models';

export const create = async (supplier: Omit<ISupplier, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.suppliers)
            .insert(supplier)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;

        } else if (typeof result === 'number') {
            return result;
        }
        
        return new Error('Register Failed');
    } catch (e) {
        console.log(e);
        return new Error('Register Failed');
    }
};