import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.suppliers, table => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().index();
        table.timestamps(true, true);
        table.dateTime('deleted_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.suppliers);
}