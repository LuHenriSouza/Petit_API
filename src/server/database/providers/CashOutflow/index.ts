import * as create from './Create';
import * as getAll from './GetAllById';
import * as countAllById from './CountAllById';

// import * as updateById from './UpdateById';
// import * as deleteById from './DeleteById';
// import * as getById from './GetById';
// import * as finish from './Finish';

export const CashOutflowProvider = {
    ...create,
    ...getAll,
    ...countAllById,
    
    // ...updateById,
    // ...deleteById,
    // ...getById,
    // ...finish,
    
};