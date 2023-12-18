import knex from 'knex';
import { development, production } from './Environment';

const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'production': return production;
        default: return development;
    }
};

export const Knex = knex(getEnvironment());