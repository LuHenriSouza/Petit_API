import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IProduct[] | Error> => {
    try {
        const result = await Knex(ETableNames.products)
            .select('*')
            .where(function () {
                this.where('name', 'like', `%${filter}%`).andWhere('deleted_at', null)
                    .orWhere('code', 'like', `%${filter}%`).andWhere('deleted_at', null);
            })
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('updated_at', 'desc');

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.products)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...result, resultById];
        }
        return result;
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};