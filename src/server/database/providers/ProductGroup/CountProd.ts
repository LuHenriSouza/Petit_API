import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const countProd = async (group_id: number, filter = ''): Promise<number | Error> => {
    try {
        const group = await Knex(ETableNames.groups).select('*').where('id', group_id).first();
        if (group) {
            const productIds = await Knex(ETableNames.product_groups)
                .select('prod_id')
                .where('name', 'ilike', `%${filter}%`)
                .andWhere('group_id', group.id);

            const [{ count }] = await Knex(ETableNames.products)
                .select('*')
                .whereIn('id', productIds.map((item) => item.prod_id))
                .andWhere('deleted_at', null)
                .count<[{ count: number }]>('* as count');


            if (Number.isInteger(Number(count))) return Number(count);

            return new Error('Count Failed');
        } else {
            return new Error('Group not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};