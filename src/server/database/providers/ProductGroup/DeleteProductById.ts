import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteProductById = async (prod_id: number): Promise<void | Error> => {
    try {
        const deleted = await Knex(ETableNames.product_groups).select('id').where('prod_id', prod_id).first();
        if (deleted) {
            await Knex(ETableNames.product_groups)
                .where('prod_id', prod_id)
                .del();

            return;
        }else{
            return new Error('This Object has already been deleted');
        }
    } catch (e) {
        console.log(e);
        return new Error('Delete Failed');
    }
};