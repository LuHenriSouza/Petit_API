import { Knex } from 'knex';
import path from 'path';
export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        }
    }
};

export const production: Knex.Config = {
    client: process.env.DATABASE_CLIENT,
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: { rejectUnauthorized: false },

    },
};