import {
    IUser,
    ISale,
    IGroup,
    IStock,
    IProduct,
    IFincash,
    ISupplier,
    IValidity,
    ICashOutflow,
    ISaleDetails,
    IProduct_group,
} from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        products: IProduct;
        sales: ISale;
        saleDetails: ISaleDetails;
        fincashs: IFincash;
        cashOutflows: ICashOutflow;
        stocks: IStock;
        groups: IGroup;
        product_groups: IProduct_group;
        users: IUser;
        suppliers: ISupplier;
        validitier: IValidity;
    }
}