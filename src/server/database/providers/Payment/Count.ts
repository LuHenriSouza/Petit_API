import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (supplier_id?: number): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.payments)
            .where((builder) => {
                if (supplier_id) {
                    builder.where(`${ETableNames.payments}.supplier_id`, supplier_id);
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