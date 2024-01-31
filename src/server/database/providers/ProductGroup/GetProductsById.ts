import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const getProductsById = async (page: number, limit: number, filter: string, group_id: number): Promise<IProduct[] | Error> => {
    try {
        const group = await Knex(ETableNames.groups).select('*').where('id', group_id).first();
        if (group) {
            const productIds = await Knex(ETableNames.product_groups)
                .select('prod_id')
                .where('group_id', group.id)
                .orderBy('created_at', 'desc');

            const result = await Knex(ETableNames.products)
                .select('*')
                .whereIn('id', productIds.map((item) => item.prod_id))
                .andWhere('name', 'ilike', `%${filter}%`)
                .andWhere('deleted_at', null)
                .offset((page - 1) * limit)
                .limit(limit);

            if (result) return result;

            return new Error('Get Failed');
        } else {
            return new Error('Group not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};