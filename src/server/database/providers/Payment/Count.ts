import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.payments)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};