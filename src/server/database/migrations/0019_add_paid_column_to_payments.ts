import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.payments, (table) => {
        table.dateTime('paid');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.payments, (table) => {
        table.dropColumn('paid');
    });
}
