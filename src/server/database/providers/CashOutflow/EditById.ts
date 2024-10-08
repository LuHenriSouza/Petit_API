import { IBodyOutflow } from '../../../controllers/CashOutflow/types';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const EditById = {
    update: async (outflow_id: number, outflow: IBodyOutflow) => {
        try {
            const outflowExist = await Knex(ETableNames.cashOutflows)
                .select('*')
                .where('id', outflow_id)
                .first();
            if (!outflowExist) return new Error('Outflow not found');
            const result = await Knex(ETableNames.cashOutflows)
                .update({
                    ...outflow,
                    updated_at: Knex.fn.now(),
                })
                .where('id', '=', outflow_id);

            if (result > 0) {
                return;
            }

            return new Error('Update Failed');
        } catch (e) {
            console.log(e);
            return new Error('Update Failed');
        }
    },
    add: async (fincash_id: number, outflowBody: IBodyOutflow) => {
        try {
            const fincash = await Knex(ETableNames.fincashs)
                .select('*')
                .where('id', fincash_id)
                .first();
            if (!fincash) return new Error('Fincash not found');
            if (fincash.deleted_at) return new Error('This Fincash has been deleted');
            const outflow = { ...outflowBody, fincash_id, };
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
    softDelete: async (outflow_id: number) => {
        try {
            const result = await Knex(ETableNames.cashOutflows)
                .update({
                    deleted_at: Knex.fn.now(),
                })
                .where('id', '=', outflow_id);

            if (result > 0) {
                return;
            }

            return new Error('Delete Failed');
        } catch (e) {
            console.log(e);
            return new Error('Delete Failed');
        }
    },
    hardDelete: async (outflow_id: number) => {
        try {
            const result = await Knex(ETableNames.cashOutflows)
                .where('id', '=', outflow_id)
                .del();

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