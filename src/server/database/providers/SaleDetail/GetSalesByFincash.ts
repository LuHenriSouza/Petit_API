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
        const result = await Knex(ETableNames.saleDetails)
            .select('sale_id')
            .sum('pricetotal as totalValue')
            .groupBy('sale_id')
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('sale_id', 'desc');

        const salesPromises = result.map(async (row) => {

            const sale = await Knex(ETableNames.sales)
                .select('created_at')
                .select('obs')
                .where('id', row.sale_id)
                .andWhere('fincash_id', fincash_id)
                .first();
            if (sale) {
                return {
                    sale_id: row.sale_id,
                    created_at: sale.created_at,
                    obs: sale.obs,
                    totalValue: row.totalValue,
                };
            } else {
                return {};
            }
        });

        const dirtySales = await Promise.all(salesPromises);

        const sales = dirtySales.filter(objeto => Object.keys(objeto).length > 0);

        return sales.map((row) => ({
            sale_id: row.sale_id,
            obs: row.obs,
            created_at: row.created_at,
            totalValue: row.totalValue,
        }));

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};
