import { IProduct } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        products: IProduct,
        sales: ISale,
        product_sales: IProduct_sale,
        fincashs: IFincash,
        outTypes: IOutType,
        cashOutflows: ICashOutflow,
        stocks: IStock,
        groups: IGroup,
        product_groups: IProduct_group,
    }
}