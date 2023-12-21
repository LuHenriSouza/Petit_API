import * as create from './Create';
import * as getAll from './GetAll';
import * as putProdInGroup from './PutProdInGroup';
import * as getProductsById from './GetProductsById';
import * as deleteProductById from './DeleteProductById';
import * as deleteGroupById from './DeleteGroupById';

export const ProdGroupController = {
    ...create,
    ...putProdInGroup,
    ...getAll,
    ...getProductsById,
    ...deleteProductById,
    ...deleteGroupById,

};