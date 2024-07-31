import { Knex } from '../../../knex';
import { ETableNames } from '../../../ETableNames';

export interface IResponse {
    id: number;
    cardValue: number;
    totalValue: number;
    finalDate: Date;
}

export const getDataByDate = async (init: Date, end: Date): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex<IResponse>(ETableNames.fincashs)
            .select(
                'id',
                'cardValue',
                'totalValue',
                'finalDate'
            )
            .whereBetween('finalDate', [init, end])
            .orderBy('finalDate');

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};
