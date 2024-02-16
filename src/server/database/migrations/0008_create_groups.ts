import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.groups, table => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().index();
        table.boolean('show').defaultTo(false).index();
        
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.groups);
}