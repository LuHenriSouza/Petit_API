import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPayment } from '../../models';

export const getById = async (id: number): Promise<IPayment | Error> => {
    try {
        const result = await Knex(ETableNames.payments)
            .join(ETableNames.suppliers, `${ETableNames.payments}.supplier_id`, `${ETableNames.suppliers}.id`)
            .select(
                `${ETableNames.suppliers}.name`,
                `${ETableNames.payments}.*`,
            )
            .where(`${ETableNames.payments}.id`, '=', id)
            .first();

        if (result) return result;

        return new Error('Get By ID Failed');
    } catch (e) {
        console.log(e);
        return new Error('Get By ID Failed');
    }
};