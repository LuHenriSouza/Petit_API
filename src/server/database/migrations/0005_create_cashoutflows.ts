import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.cashOutflows, table => {
        table.bigIncrements('id').primary().index();
        table.string('type').notNullable();
        table.bigInteger('fincash_id').index().notNullable().references('id').inTable(ETableNames.fincashs).onUpdate('CASCADE').onDelete('RESTRICT');
        table.decimal('value').notNullable();
        table.text('desc');
        table.timestamps(true, true);
        table.dateTime('deleted_at');

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.cashOutflows);
}