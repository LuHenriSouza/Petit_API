import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICashOutflow } from '../../models';

export const getAllById = async (page: number, limit: number, sale_id: number): Promise<ICashOutflow[] | Error> => {
    try {
        const sale = await Knex(ETableNames.sales).select('*').where('id', sale_id).first();
        if (sale) {
            const result = await Knex(ETableNames.saleDetails)
                .select('*')
                .where('sale_id', sale_id).andWhere('deleted_at', null)
                .offset((page - 1) * limit)
                .limit(limit);
            return result;
        } else {
            return Error('Sale not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};