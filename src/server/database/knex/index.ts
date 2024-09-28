import knex from 'knex';
import { development } from './Environment';
import pg from 'pg';
import 'dotenv/config';


if (process.env.NODE_ENV) {
    pg.types.setTypeParser(20, 'text', parseInt);
}


// const getEnvironment = () => {
//     switch (process.env.NODE_ENV) {
//         case 'production': return production;
//         default: return development;
//     }
// };

export const Knex = knex(development);