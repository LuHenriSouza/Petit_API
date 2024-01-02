import * as create from './Create';
import * as getAll from './GetAll';
import * as getSales from './GetSales';
import * as getAllById from './GetAllById';

// // import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';
// import * as finish from './Finish';

export const SaleDetailController = {
    ...create,
    ...getAll,
    ...getSales,
    ...getAllById,

    // // ...updateById,
    // ...deleteById,
    // ...finish,
};