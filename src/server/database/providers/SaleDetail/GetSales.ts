
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

interface IGetSales {
    sale_id: number,
    obs: string,
    created_at: Date,
    totalValue: number,
}

export const getSales = async (page: number, limit: number): Promise<IGetSales[] | Error> => {
    try {

        const result = await Knex<IGetSales>(ETableNames.sales)
            .join(ETableNames.saleDetails, `${ETableNames.sales}.id`, `${ETableNames.saleDetails}.sale_id`)
            .select(
                `${ETableNames.saleDetails}.sale_id`,
                `${ETableNames.sales}.obs`,
                `${ETableNames.sales}.created_at`,
                Knex.raw('SUM(sale_details.pricetotal) as totalValue')
            )
            .groupBy(`${ETableNames.saleDetails}.sale_id`)
            .orderBy(`${ETableNames.saleDetails}.sale_id`, 'desc')
            .offset((page - 1) * limit)
            .limit(limit);

        return result;
        // const result = await Knex(ETableNames.saleDetails)
        //     .select('sale_id')
        //     .sum('pricetotal as totalValue')
        //     .groupBy('sale_id')
        //     .offset((page - 1) * limit)
        //     .limit(limit)
        //     .orderBy('sale_id', 'desc');

        // const salesPromises = result.map(async (row) => {
        //     const sale = await Knex(ETableNames.sales)
        //         .select('created_at')
        //         .select('obs')
        //         .where('id', row.sale_id)
        //         .first();
        //     return {
        //         sale_id: row.sale_id,
        //         created_at: sale?.created_at,
        //         obs: sale?.obs,
        //         totalValue: row.totalValue,
        //     };
        // });

        // const sales = await Promise.all(salesPromises);

        // return sales.map((row) => ({
        //     sale_id: row.sale_id,
        //     obs: row.obs,
        //     created_at: row.created_at,
        //     totalValue: row.totalValue,
        // }));

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};
