import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduct, IStock } from '../../models';


type ProductWithStock = {
    product: IProduct;
    stock: IStock;
};

export const getAll = async (page: number, limit: number): Promise<ProductWithStock[] | Error> => {
    try {
        const stocks = await Knex(ETableNames.stocks)
            .select('*')
            .offset((page - 1) * limit)
            .limit(limit);

        const productIds = stocks.map((stock) => stock.prod_id);

        const products = await Knex(ETableNames.products)
            .select('*')
            .whereIn('id', productIds)
            .andWhere('deleted_at', null);

        const stockMap: Record<number, IStock> = {};
        stocks.forEach((stock) => {
            stockMap[stock.prod_id] = stock;
        });

        // Combine product and stock data
        const result: ProductWithStock[] = products.map((product) => ({
            product,
            stock: stockMap[product.id] || null, // Use null if no stock is found for the product
        }));

        return result;
    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};