import * as create from './Create';
import * as getAll from './GetAll';
// import * as getById from './GetById';
// import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';
import * as count from './Count';
import * as getAllById from './GetAllById';

export const SaleDetailProvider = {
    ...create,
    ...getAll,
    ...getAllById,
    // ...getById,
    // ...updateById,
    // ...deleteById,
    ...count,
};