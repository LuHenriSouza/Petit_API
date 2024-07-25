import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export interface IResponse {
    prod_id: number,
    prod_code: number,
    prod_name: string,
    prod_price: number,
    prod_sector: number,
    quantity: number,
    solded_price: number,
    total_value: number
}

export const getDataById = async (init: Date, end: Date, sectors: number[]): Promise<IResponse[] | Error> => {
    try {
        const result = await Knex(ETableNames.sales)
            .join(ETableNames.saleDetails, `${ETableNames.sales}.id`, `${ETableNames.saleDetails}.sale_id`)
            .join(ETableNames.products, `${ETableNames.products}.id`, `${ETableNames.saleDetails}.prod_id`)
            .leftJoin(ETableNames.product_groups, `${ETableNames.products}.id`, `${ETableNames.product_groups}.prod_id`)
            .select(
                `${ETableNames.products}.id as prod_id`,
                `${ETableNames.products}.code as prod_code`,
                `${ETableNames.products}.name as prod_name`,
                `${ETableNames.products}.price as prod_price`,
                `${ETableNames.products}.sector as prod_sector`,
                Knex.raw('SUM(sale_details.quantity) as quantity'),
                `${ETableNames.saleDetails}.price as solded_price`,
                Knex.raw('SUM(sale_details.pricetotal) as total_value')
            )
            .whereBetween(`${ETableNames.sales}.sale_date`, [init, end])
            .whereIn(`${ETableNames.products}.sector`, sectors)
            .groupBy(`${ETableNames.products}.id`, `${ETableNames.saleDetails}.price`);

        return result;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`);
    }
};
