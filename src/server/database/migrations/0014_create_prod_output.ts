import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.prod_output, table => {
        table.bigIncrements('id').primary().index();
        table.bigInteger('prod_id').index().notNullable().references('id').inTable(ETableNames.products).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.bigInteger('fincash_id').index().nullable().references('id').inTable(ETableNames.fincashs).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.integer('quantity').notNullable().defaultTo(0);
        table.string('reason').notNullable();
        table.text('desc');
        table.timestamps(true, true);
        table.dateTime('deleted_at');

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.prod_output);
}