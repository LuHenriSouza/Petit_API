import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.sales, (table) => {
        table.dateTime('deleted_at');
        table.text('cancel_reason');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.sales, (table) => {
        table.dropColumn('deleted_at');
        table.dropColumn('cancel_reason');
    });
}
