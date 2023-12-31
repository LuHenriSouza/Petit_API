import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as getByCode from './GetByCode';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as count from './Count';

export const ProductProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...getByCode,
    ...updateById,
    ...deleteById,
    ...count,
};