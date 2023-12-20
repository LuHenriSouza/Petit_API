import * as create from './Create';
import * as getAll from './GetAll';
import * as getAllById from './GetAllById';
// // import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';
// import * as finish from './Finish';

export const SaleDetailController = {
    ...create,
    ...getAllById,
    ...getAll,
    // // ...updateById,
    // ...deleteById,
    // ...finish,
    
};