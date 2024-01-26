import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';

export const getLastFincash = async (): Promise<IFincash | Error> => {
    try {
        const result = await Knex(ETableNames.fincashs)
            .select('*')
            .where('isFinished', true)
            .orderBy('finalDate', 'desc')
            .first();

        if (result) return result;

        return new Error('Get Failed');
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};