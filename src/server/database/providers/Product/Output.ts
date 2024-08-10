import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProdOutput } from '../../models';


export const output = async (prod_output: Omit<IProdOutput, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {

        const Stock = await Knex(ETableNames.stocks).select('*').where('prod_id', prod_output.prod_id).first();
        if (!Stock || Stock.stock <= 0) return Error('Stock not Found or <= 0');

        const result = await Knex(ETableNames.prod_output).insert(prod_output);
        if (!result) return Error('Insert Error');

        const output = await Knex(ETableNames.stocks).update({ stock: (Stock.stock - prod_output.quantity), updated_at: Knex.fn.now() }).where('prod_id', prod_output.prod_id);
        if (!output) return Error('Update Stock Error');

        return output;

    } catch (e) {
        console.log(e);
        return new Error('Fincash not Found');
    }
};