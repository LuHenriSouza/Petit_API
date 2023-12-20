import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.sales, table => {
        table.bigIncrements('id').primary().index();
        table.bigInteger('fincash_id').notNullable().index().references('id').inTable(ETableNames.fincashs).onUpdate('CASCADE').onDelete('RESTRICT').unsigned();
        table.timestamps(true, true);        
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.sales);
}