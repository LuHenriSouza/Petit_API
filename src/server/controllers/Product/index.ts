import * as create from './Create';
import * as getAll from './GetAll';
import * as output from './Output';
import * as getById from './GetById';
import * as getByCode from './GetByCode';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getSectorValue from './query/GetSectorValue';
import * as getSectorQuantity from './query/GetSectorQuantity';

export const ProductController = {
    ...create,
    ...getAll,
    ...output,
    ...getById,
    ...getByCode,
    ...updateById,
    ...deleteById,
    ...getSectorValue,
    ...getSectorQuantity,
};