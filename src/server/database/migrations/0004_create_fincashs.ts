import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.fincashs, table => {
        table.bigIncrements('id').primary().index();
        table.string('opener').notNullable().index();
        table.decimal('value').notNullable();
        table.text('obs').nullable();
        table.decimal('finalValue');
        table.decimal('totalValue');
        table.decimal('cardValue');
        table.decimal('invoicing');
        table.decimal('profit');
        table.decimal('diferenceLastFincash');
        table.decimal('break');
        table.boolean('isFinished').defaultTo(false);
        table.dateTime('finalDate');
        table.timestamps(true, true);
        table.dateTime('deleted_at');

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.fincashs);
}