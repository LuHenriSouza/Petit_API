import * as create from './Create';
import * as getAll from './GetAll';
import * as getProductsById from './GetProductsById';
import * as deleteGroupById from './DeleteGroupById';
import * as deleteByProductId from './DeleteProductById';
import * as count from './Count';
import * as putProdInGroup from './PutProdInGroup';

export const ProdGroupProvider = {
    ...create,
    ...getAll,
    ...getProductsById,
    ...deleteGroupById,
    ...deleteByProductId,
    ...count,
    ...putProdInGroup,

};