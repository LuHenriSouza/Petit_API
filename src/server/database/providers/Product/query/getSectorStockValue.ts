import { Knex } from '../../../knex';
import { ETableNames } from '../../../ETableNames';

export interface IResponse {
    sector: number;
    value: number;
}

export const getSectorStockValue = async (sectors = [1, 2, 3, 4]): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex<IResponse[]>(ETableNames.products)
            .join(ETableNames.stocks, `${ETableNames.stocks}.prod_id`, `${ETableNames.products}.id`)
            .select(`${ETableNames.products}.sector`, Knex.raw(`sum(${ETableNames.stocks}.stock * ${ETableNames.products}.price) as value`))
            .whereIn(`${ETableNames.products}.sector`, sectors)
            .andWhere(`${ETableNames.stocks}.stock`, '>', 0)
            .groupBy(`${ETableNames.products}.sector`)
            .orderBy('sector');

        return result;
    } catch (error) {
        console.error(error);
        return new Error(`Failed to fetch data: ${error}`);
    }
};