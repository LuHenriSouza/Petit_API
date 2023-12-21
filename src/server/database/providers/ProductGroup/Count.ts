import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.groups)
            .where('name', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};