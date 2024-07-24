import { ETableNames } from '../../../ETableNames';
import { Knex } from '../../../knex';

export const countData = async (id: number, filter = '', setors: number[], group_id?: number): Promise<number | Error> => {
    try {

        const [{ count }] = await Knex(ETableNames.sales)
            .join(ETableNames.saleDetails, `${ETableNames.sales}.id`, `${ETableNames.saleDetails}.sale_id`)
            .join(ETableNames.products, `${ETableNames.products}.id`, `${ETableNames.saleDetails}.prod_id`)
            .leftJoin(ETableNames.product_groups, `${ETableNames.products}.id`, `${ETableNames.product_groups}.prod_id`)
            .where(`${ETableNames.sales}.fincash_id`, id)
            .andWhere(`${ETableNames.products}.name`, 'ilike', `%${filter}%`)
            .andWhere(function () {
                if (group_id) {
                    this.where(`${ETableNames.product_groups}.group_id`, group_id);
                }
            })
            .whereIn(`${ETableNames.products}.sector`, setors)
            .countDistinct(`${ETableNames.saleDetails}.prod_id as count`);

        console.log(count);
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return 0;
    }
};