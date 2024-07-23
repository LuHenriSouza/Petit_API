import { ETableNames } from '../../../ETableNames';
import { Knex } from '../../../knex';

export const countData = async (id: number, filter = '', setors: number[]): Promise<number | Error> => {
    try {

        const [{count}] = await Knex(ETableNames.sales)
            .join(ETableNames.saleDetails, `${ETableNames.sales}.id`, `${ETableNames.saleDetails}.sale_id`)
            .join(ETableNames.products, `${ETableNames.products}.id`, `${ETableNames.saleDetails}.prod_id`)
            .where(`${ETableNames.sales}.fincash_id`, id)
            .andWhere(`${ETableNames.products}.name`, 'ilike', `%${filter}%`)
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