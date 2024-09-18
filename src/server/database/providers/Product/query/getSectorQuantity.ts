import { Knex } from '../../../knex';
import { ETableNames } from '../../../ETableNames';

export interface IResponse {
    sector: number;
    quantity: number;
}

export const getSectorQuantity = async (sectors = [1, 2, 3, 4]): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex<IResponse[]>(ETableNames.products)
            .select('sector', Knex.raw('count(*) as quantity'))
            .whereIn('sector', sectors)
            .groupBy('sector')
            .orderBy('sector');

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};