import { ETableNames } from '../ETableNames';
import { IProduct } from '../models';
import { randString, randNumber } from '../../shared/services';
import { Knex } from '../knex';

const NumberOfInsertions = 500;

const productCode: string[] = [];
const productName: string[] = [];
const productSector: number[] = [];
const productPrice: number[] = [];

for (let i = 0; i < NumberOfInsertions; i++) {
    productCode.push(randNumber(10).toString());
    productName.push(randString(10));
    productSector.push(Math.floor(Math.random() * 4) + 1);
    productPrice.push(randNumber(3) / 100);
}

export const seed = async () => {
    const [{ count }] = await Knex(ETableNames.products).count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || count > 0) return;

    const productsToInsert: Omit<IProduct, 'id' | 'created_at' | 'updated_at'>[] = [];

    for (let i = 0; i < NumberOfInsertions; i++) {
        productsToInsert.push({
            code: productCode[i],
            name: productName[i],
            sector: productSector[i],
            price: productPrice[i],

        });
    }
    await Knex(ETableNames.products).insert(productsToInsert);
};
