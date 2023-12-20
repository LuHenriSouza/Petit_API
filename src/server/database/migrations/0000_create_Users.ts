import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.users, table => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().checkLength('>=', 3);
        table.string('email').index().unique().notNullable().checkLength('>=', 5);
        table.string('password').notNullable().checkLength('>=', 6);

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.users);
}