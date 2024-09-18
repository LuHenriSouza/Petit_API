import { Knex } from '../../../knex';
import { ETableNames } from '../../../ETableNames';

export interface IResponse {
    sector: number;
    stock: number;
}

export const getSectorStock = async (sectors = [1, 2, 3, 4]): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex<IResponse[]>(ETableNames.products)
            .join(ETableNames.stocks, `${ETableNames.stocks}.prod_id`, `${ETableNames.products}.id`)
            .select(`${ETableNames.products}.sector`, Knex.raw(`sum(${ETableNames.stocks}.stock) as stock`))
            .whereIn(`${ETableNames.products}.sector`, sectors)
            .andWhere(`${ETableNames.stocks}.stock`, '>', 0)
            .groupBy(`${ETableNames.products}.sector`)
            .orderBy('sector');

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};