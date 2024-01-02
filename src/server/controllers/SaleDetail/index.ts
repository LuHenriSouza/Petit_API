import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as getSales from './GetSales';
import * as getAllById from './GetAllById';
import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';

export const SaleDetailController = {
    ...create,
    ...getAll,
    ...getById,
    ...getSales,
    ...getAllById,
    ...updateById,
    // ...deleteById,

};