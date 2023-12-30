import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.products, table => {
        table.bigIncrements('id').primary().index();
        table.string('code', 40).index().checkLength('<=', 40).notNullable().unique();
        table.string('name', 50).index().checkLength('<=', 50).notNullable();
        table.integer('sector').notNullable();
        table.decimal('price').notNullable();
        table.timestamps(true, true);
        table.dateTime('deleted_at');

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.products);
}