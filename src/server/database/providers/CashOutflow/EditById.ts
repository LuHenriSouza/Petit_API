import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICashOutflow } from '../../models';

export const EditById = {
    update: async (id: number, outflow: Omit<ICashOutflow, 'id' | 'fincash_id' | 'created_at' | 'updated_at'>) => {
        try {
            const result = await Knex(ETableNames.cashOutflows)
                .update({
                    ...outflow,
                    updated_at: Knex.fn.now(),
                })
                .where('id', '=', id);

            if (result > 0) {
                return;
            }

            return new Error('Update Failed');
        } catch (e) {
            console.log(e);
            return new Error('Update Failed');
        }
    },
    add: async (outflow: Omit<ICashOutflow, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const fincash = await Knex(ETableNames.fincashs)
                .select('*')
                .where('id', outflow.fincash_id)
                .first();

            if (!fincash) return new Error('Fincash not found');
            if (fincash.deleted_at) return new Error('This Fincash has been deleted');
            const [result] = await Knex(ETableNames.cashOutflows)
                .insert(outflow)
                .returning('id');

            if (typeof result === 'object') {
                return result.id;

            } else if (typeof result === 'number') {
                return result;
            }

            return new Error('Register Failed');
        } catch (e) {
            console.log(e);
            return new Error('Add Failed');
        }
    },
    softDelete: async (id: number) => {
        try {
            const result = await Knex(ETableNames.cashOutflows)
                .update({
                    deleted_at: Knex.fn.now(),
                })
                .where('id', '=', id);

            if (result > 0) {
                return;
            }

            return new Error('Delete Failed');
        } catch (e) {
            console.log(e);
            return new Error('Delete Failed');
        }
    },
    hardDelete: async (id: number) => {
        try {
            const result = await Knex(ETableNames.cashOutflows)
                .delete()
                .where('id', '=', id);

            if (result > 0) {
                return;
            }

            return new Error('Delete Failed');
        } catch (e) {
            console.log(e);
            return new Error('Delete Failed');
        }
    },
};