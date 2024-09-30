
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

interface IGetSales {
    sale_id: number,
    obs: string,
    created_at: Date,
    deleted_at: Date,
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
                `${ETableNames.sales}.deleted_at`,
                Knex.raw('SUM(sale_details.pricetotal) as totalValue')
            )
            .groupBy(`${ETableNames.saleDetails}.sale_id`)
            .orderBy(`${ETableNames.saleDetails}.sale_id`, 'desc')
            .offset((page - 1) * limit)
            .limit(limit);

        return result;

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};
