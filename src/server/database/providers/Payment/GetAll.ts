import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPayment } from '../../models';

interface IResponse extends IPayment {
    name: string,
}

export const getAll = async (page: number, limit: number): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex(ETableNames.payments)
            .join(ETableNames.suppliers, `${ETableNames.payments}.supplier_id`, `${ETableNames.suppliers}.id`)
            .select(
                `${ETableNames.suppliers}.name`,
                `${ETableNames.payments}.*`,
            )
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('expiration', 'desc');

        return result;
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};