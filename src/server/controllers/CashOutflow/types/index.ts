import { ICashOutflow } from '../../../database/models';

interface IBodyDelete {
    type: 'delete';
    content: {
        id: number;
    };
}

interface IBodyUpdate {
    type: 'update';
    content: Omit<ICashOutflow, 'id' | 'fincash_id' | 'created_at' | 'updated_at'>;
}

interface IBodyAdd {
    type: 'add';
    content: Omit<ICashOutflow, 'id' | 'created_at' | 'updated_at'>;
}

export type TEditBodyProps = IBodyDelete | IBodyUpdate | IBodyAdd;
