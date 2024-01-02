import * as count from './Count';
import * as create from './Create';
import * as getAll from './GetAll';
import * as getSales from './GetSales';
import * as countSales from './CountSales';
import * as getAllById from './GetAllById';
// import * as getById from './GetById';
// import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';

export const SaleDetailProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getSales,
    ...countSales,
    ...getAllById,
    // ...getById,
    // ...updateById,
    // ...deleteById,
};