import { Knex } from '../../../knex';
import { ETableNames } from '../../../ETableNames';

export interface IResponse {
    sector: number;
    quantity: number;
}

export const getSectorValue = async (sectors = [1, 2, 3, 4]): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex(ETableNames.saleDetails)
            .join(ETableNames.products, `${ETableNames.products}.id`, `${ETableNames.saleDetails}.prod_id`)
            .select(
                `${ETableNames.products}.sector as sector`,
                Knex.raw('SUM(sale_details.pricetotal) as value')
            )
            .whereIn(`${ETableNames.products}.sector`, sectors)
            .groupBy('sector')
            .orderBy('value', 'desc');

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};