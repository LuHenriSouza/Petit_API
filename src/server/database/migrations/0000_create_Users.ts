import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { EUserRole } from '../../shared/Auth/EUserRole';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.users, table => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().checkLength('>=', 3);
        table.string('email').index().unique().notNullable().checkLength('>=', 5);
        table.string('password').notNullable().checkLength('>=', 6);
        table.string('role').notNullable().defaultTo(EUserRole.Employee);

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.users);
}