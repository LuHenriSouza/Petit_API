import * as count from './Count';
import * as create from './Create';
import * as getAll from './GetAll';
import * as finish from './Finish';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getByFinished from './GetByFinished';
import * as getLastFincash from './GetLastFincash';


export const FincashProvider = {
    ...count,
    ...create,
    ...getAll,
    ...finish,
    ...getById,
    ...updateById,
    ...deleteById,
    ...getByFinished,
    ...getLastFincash,
    
};