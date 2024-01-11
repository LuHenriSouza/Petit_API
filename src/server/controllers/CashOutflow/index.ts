import * as create from './Create';
import * as getById from './GetById';
import * as getAllById from './GetAllById';
import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';
// import * as finish from './Finish';

export const CashOutflowController = {
    ...create,
    ...getById,
    ...getAllById,
    ...updateById,
    // ...deleteById,
    // ...finish,
    
};