import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const countSaleDetails = async (sale_id: number): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.saleDetails)
            .where('sale_id', sale_id).andWhere('deleted_at', null)
            .count<[{ count: number }]>('* as count');

        console.log(count);
        if (Number.isInteger(count)) return Number(count);
        console.log(count);
        return new Error('Count Failed');
    } catch (e) {
        console.log('COUNTSALEDETAIL: ');
        console.log(e);
        return new Error('Count Failed');
    }
};