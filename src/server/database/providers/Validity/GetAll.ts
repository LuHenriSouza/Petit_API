import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';


interface IProductWithValidity extends IProduct {
    quantity: number,
    validity: Date,
    created_at: Date,
    updated_at: Date,
}

export const getAll = async (page: number, limit: number): Promise<IProductWithValidity[] | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .select('*')
            .join(ETableNames.validities, `${ETableNames.products}.id`, '=', `${ETableNames.validities}.prod_id`)
            .where(`${ETableNames.products}.deleted_at`, null)
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy(`${ETableNames.validities}.validity`);

        return result;

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};

export const countAll = async () => {
    try {
        const [{ count }] = await Knex(ETableNames.validities)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Count Failed');
    } catch (e) {
        console.log(e);
        return new Error('Count Failed');
    }
};