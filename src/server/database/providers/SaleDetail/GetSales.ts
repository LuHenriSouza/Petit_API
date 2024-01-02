
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

interface IGetSales {
    sale_id: number,
    created_at: Date,
    totalValue: number,
}

export const getSales = async (page: number, limit: number): Promise<IGetSales[] | Error> => {
    try {

        const result = await Knex(ETableNames.saleDetails)
            .select('sale_id')
            .select(Knex.raw('DATE_TRUNC(\'second\', created_at) as created_at'))
            .sum('pricetotal as totalValue')
            .groupBy('sale_id', Knex.raw('DATE_TRUNC(\'second\', created_at)'))
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('created_at', 'desc');

        return result.map(row => ({
            sale_id: row.sale_id,
            created_at: row.created_at,
            totalValue: row.totalValue,
        }));

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};
