import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

interface IGetSales {
    sale_id: number,
    obs: string,
    created_at: Date,
    totalValue: number,
}

export const getSalesByFincash = async (page: number, limit: number, fincash_id: number): Promise<IGetSales[] | Error> => {
    try {
        const sales = await Knex(ETableNames.sales)
            .select('id as sale_id', 'created_at', 'obs')
            .where('fincash_id', fincash_id)
            .orderBy('id', 'desc')
            .offset((page - 1) * limit)
            .limit(limit);

        const salesPromises = sales.map(async (sale) => {
            const saleDetailsResult = await Knex(ETableNames.saleDetails)
                .select('sale_id')
                .sum('pricetotal as totalValue')
                .where('sale_id', sale.sale_id)
                .groupBy('sale_id')
                .first();

            return {
                sale_id: sale.sale_id,
                created_at: sale.created_at,
                obs: sale.obs,
                totalValue: saleDetailsResult ? saleDetailsResult.totalValue : 0,
            };
        });

        const salesDetails = await Promise.all(salesPromises);

        return salesDetails;
    } catch (e) {
        console.error(e);
        return new Error('Get Failed');
    }
};

export const countSalesByFincash = async (fincash_id: number): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.sales)
            .where('fincash_id', fincash_id)
            .count<[{ count: number }]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};