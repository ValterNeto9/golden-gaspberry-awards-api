    import { Knex } from "knex";
    import path from 'path'

    export const development: Knex.Config = {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: ':memory:'
        },
        migrations: {
            directory: path.resolve(__dirname, 'migration-csv'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'seeds'),
        },
        pool: {
            afterCreate: (connection: any, done: Function) => {
                connection.run('PRAGMA foreign_keys = ON');
                done();
            }
        }
    };

    export const test: Knex.Config = {
        ...development,
        connection: {
            filename: ':memory:',
        }
    };
