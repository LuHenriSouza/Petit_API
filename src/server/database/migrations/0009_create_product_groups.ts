import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.product_groups, table => {
        table.bigIncrements('id').primary().index();
        table.bigInteger('group_id').index().notNullable().references('id').inTable(ETableNames.groups).onUpdate('CASCADE').onDelete('CASCADE').unsigned();
        table.bigInteger('prod_id').index().notNullable().references('id').inTable(ETableNames.products).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.dateTime('created_at').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.product_groups);
}