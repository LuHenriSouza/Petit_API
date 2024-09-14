import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const outputCount = async (): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.prod_output)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};