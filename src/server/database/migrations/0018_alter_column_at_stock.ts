import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(ETableNames.stocks, table => {
        table.unique(['prod_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(ETableNames.stocks, table => {
        table.dropUnique(['prod_id']);
    });
}
