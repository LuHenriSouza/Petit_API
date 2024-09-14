import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter: string): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.products)
            .join(ETableNames.stocks, `${ETableNames.products}.id`, '=', `${ETableNames.stocks}.prod_id`)
            .where(`${ETableNames.products}.deleted_at`, null)
            .andWhere(`${ETableNames.stocks}.stock`, '<>', 0)
            .andWhere((builder) => {
                if (filter) {
                    builder.where(`${ETableNames.products}.name`, 'ilike', `%${filter}%`).orWhere(`${ETableNames.products}.code`, 'ilike', `%${filter}%`);
                }
            })
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};