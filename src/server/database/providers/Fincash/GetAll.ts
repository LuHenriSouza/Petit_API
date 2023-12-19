import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IFincash[] | Error> => {
    try {
        const result = await Knex(ETableNames.fincashs)
            .select('*')
            .where(function () {
                this.where('id', '=', id).andWhere('deleted_at', null)
                    .orWhere('opener', 'like', `%${filter}%`).andWhere('deleted_at', null);
            })
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.fincashs)
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