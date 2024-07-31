import * as create from './Create';
import * as getAll from './GetAll';
import * as finish from './Finish';
import * as getById from './GetById';
import * as updateObs from './UpdateObs';
import * as calcBreak from './CalcBreak';
import * as deleteById from './DeleteById';
import * as getByFinished from './GetByFinished';
import * as getDataById from './query/GetDataById';
import * as getLastFincash from './GetLastFincash';
import * as getTotalByFincash from './GetTotalByFincash';
import * as getCurrentMonth from './query/getCurrentMonth';
// import * as updateById from './UpdateById';

export const FincashController = {
    ...create,
    ...getAll,
    ...finish,
    ...getById,
    ...updateObs,
    ...calcBreak,
    ...deleteById,
    ...getDataById,
    ...getByFinished,
    ...getLastFincash,
    ...getCurrentMonth,
    ...getTotalByFincash,
    // ...updateById,

};