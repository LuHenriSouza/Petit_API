import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.saleDetails, (table) => {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.dropColumn('deleted_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(ETableNames.saleDetails, (table) => {
        table.timestamps(true, true);  // Recria as colunas created_at e updated_at
        table.dateTime('deleted_at');  // Recria a coluna deleted_at
    });
}
