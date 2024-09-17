import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.payments, table => {
        table.bigIncrements('id').primary().index();
        table.bigInteger('supplier_id').index().references('id').inTable(ETableNames.suppliers).onUpdate('CASCADE').onDelete('RESTRICT');
        table.string('code', 60).checkLength('<=', 60).notNullable().unique().index();
        table.dateTime('expiration').notNullable();
        table.decimal('value').notNullable();
        table.text('desc');
        table.timestamps(true, true);
        
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.payments);
}