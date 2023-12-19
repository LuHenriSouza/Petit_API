import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';

export const finish = async (id: number, fincash: Omit<IFincash, 'id' | 'created_at' | 'updated_at' | 'opener' | 'value'>): Promise<void | Error> => {
    try {
        if (!fincash.isFinished) return Error('isFinished cannot be false');

        const [{ count }] = await Knex(ETableNames.fincashs).where('id', id).count<[{ count: number }]>('* as count');
        if (count === 0) return Error('Fincash not found');

        const finished = await Knex(ETableNames.fincashs).select('*').where('id', id).andWhere('isFinished', true).first();
        if (!finished) {
            const result = await Knex(ETableNames.fincashs)
                .update({ ...fincash })
                .where('id', id);

            if (result > 0) {
                return;
            } else {
                return new Error('Finish Failed: INTERNAL ERROR');
            }
        } else {
            return new Error('FinCash already Finished');
        }

    } catch (e) {
        console.log(e);
        return new Error('Finish Failed');
    }
};
