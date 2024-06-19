import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: ':memory:'
    },
    useNullAsDefault: true
};

export default config;