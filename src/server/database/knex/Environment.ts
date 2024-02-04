import { Knex } from 'knex';
import path from 'path';
import 'dotenv/config';


export const development: Knex.Config = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    connection: {
        host: 'petit-api.cd00qiusm57h.us-east-1.rds.amazonaws.com',
        user: 'postgres',
        database: 'petit_api',
        password: '20032002l',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        },

    },
};

// export const production: Knex.Config = {
//     client: process.env.DATABASE_CLIENT,
//     migrations: {
//         directory: path.resolve(__dirname, '..', 'migrations'),
//     },
//     seeds: {
//         directory: path.resolve(__dirname, '..', 'seeds'),
//     },
//     connection: {
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         database: process.env.DATABASE_NAME,
//         password: process.env.DATABASE_PASSWORD,
//         port: Number(process.env.DATABASE_PORT || 5432),
//         ssl: false,

//     },
// };