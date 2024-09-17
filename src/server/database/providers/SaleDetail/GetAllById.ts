import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISaleDetails } from '../../models';

interface IResponse {
    data: ISaleDetails[],
    totalValue: number,
}

export const getAllById = async (page: number, limit: number, sale_id: number): Promise<IResponse | Error> => {
    try {
        const sale = await Knex(ETableNames.sales).select('*').where('id', sale_id).first();
        if (sale) {
            const result = await Knex(ETableNames.saleDetails)
                .select('*')
                .where('sale_id', sale_id).andWhere('deleted_at', null)
                .offset((page - 1) * limit)
                .limit(limit);

            const countResult = await Knex(ETableNames.saleDetails)
                .where('sale_id', sale_id)
                .andWhere('deleted_at', null)
                .sum('pricetotal as totalValue')
                .first<{ totalValue: number }>();

            const totalValue = countResult ? countResult.totalValue || 0 : 0;

            return {
                data: result,
                totalValue: totalValue,
            };
            
        } else {
            return Error('Sale not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};