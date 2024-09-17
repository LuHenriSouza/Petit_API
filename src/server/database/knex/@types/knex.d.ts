import {
    IUser,
    ISale,
    IGroup,
    IStock,
    IProduct,
    IFincash,
    IPayment,
    ISupplier,
    IValidity,
    IProdOutput,
    ICashOutflow,
    ISaleDetails,
    IProduct_group,
} from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        users: IUser;
        sales: ISale;
        groups: IGroup;
        stocks: IStock;
        products: IProduct;
        fincashs: IFincash;
        payments: IPayment;
        suppliers: ISupplier;
        validities: IValidity;
        prod_output: IProdOutput;
        sale_details: ISaleDetails;
        cash_outflows: ICashOutflow;
        product_groups: IProduct_group;
    }
}