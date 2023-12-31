import * as create from './Create';
import * as getAll from './GetAll';
import * as finish from './Finish';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as getByFinished from './GetByFinished';
// import * as updateById from './UpdateById';

export const FincashController = {
    ...create,
    ...getAll,
    ...finish,
    ...getById,
    ...deleteById,
    ...getByFinished,
    // ...updateById,
    
};