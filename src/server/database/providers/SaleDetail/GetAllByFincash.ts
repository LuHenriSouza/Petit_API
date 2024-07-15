import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

interface IItem {
    id: number,
    fincash_id: number,
    obs: string,
    code: string,
    name: string,
    prod_price: number,
    sector: number,
    quantity: number,
    solded_price: number,
    pricetotal: number,
    created_at: string,
    updated_at: string
}

interface IComplete {
    id: number,
    fincash_id: number,
    obs: string,
    products: {
        code: string,
        name: string,
        prod_price: number,
        sector: number,
        quantity: number,
        solded_price: number,
        price_total_per_product: number,
    }[],
    pricetotal_all_products: number,
    created_at: string,
    updated_at: string
}

interface IResponse {
    data: IComplete[];
    totalFincashValue: number;
}

export const getAllByFincash = async (page: number, limit: number, fincash_id: number): Promise<IResponse | Error> => {
    try {
        const data: IItem[] = await Knex(ETableNames.sales)
            .join(ETableNames.saleDetails, `${ETableNames.sales}.id`, `${ETableNames.saleDetails}.sale_id`)
            .join(ETableNames.products, `${ETableNames.products}.id`, `${ETableNames.saleDetails}.prod_id`)
            .where(`${ETableNames.sales}.fincash_id`, fincash_id)
            .offset((page - 1) * limit)
            .limit(limit)
            .select(
                `${ETableNames.sales}.id`,
                `${ETableNames.sales}.fincash_id`,
                `${ETableNames.sales}.obs`,

                `${ETableNames.products}.code`,
                `${ETableNames.products}.name`,
                `${ETableNames.products}.price as prod_price`,
                `${ETableNames.products}.sector`,

                `${ETableNames.saleDetails}.quantity`,
                `${ETableNames.saleDetails}.price as solded_price`,
                `${ETableNames.saleDetails}.pricetotal`,

                `${ETableNames.sales}.created_at`,
                `${ETableNames.sales}.updated_at`,
            );

        const result = groupById(data);

        return result;

    } catch (e) {
        console.log(e);
        return new Error('Get Failed');
    }
};

const groupById = (arr: IItem[]) => {
    const grouped: Record<number, IComplete> = {};

    arr.forEach(obj => {
        if (!grouped[obj.id]) {
            grouped[obj.id] = {
                id: obj.id,
                fincash_id: obj.fincash_id,
                obs: obj.obs,
                products: [],
                pricetotal_all_products: 0,
                created_at: obj.created_at,
                updated_at: obj.updated_at
            };
        }

        grouped[obj.id].products.push({
            code: obj.code,
            name: obj.name,
            prod_price: obj.prod_price,
            sector: obj.sector,
            quantity: obj.quantity,
            solded_price: obj.solded_price,
            price_total_per_product: obj.pricetotal
        });

        grouped[obj.id].pricetotal_all_products += Number(obj.pricetotal);
    });
    const data = Object.values(grouped);
    const totalFincashValue = data.reduce((a, b) => a + b.pricetotal_all_products, 0);
    return { data, totalFincashValue };
};