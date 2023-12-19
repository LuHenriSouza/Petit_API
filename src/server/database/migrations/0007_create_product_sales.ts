import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.product_sales, table => {
        table.bigIncrements('id').primary().index();
        table.bigInteger('sale_id').index().notNullable().references('id').inTable(ETableNames.sales).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.bigInteger('prod_id').index().notNullable().references('id').inTable(ETableNames.products).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.integer('quantity').notNullable().unsigned();
        table.decimal('price').notNullable();
        table.decimal('pricetotal').notNullable();
        table.timestamps(true, true);
        table.dateTime('deleted_at');

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.product_sales);
}