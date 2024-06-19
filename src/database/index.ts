import { knex } from 'knex';

import config from './knexfile';
import { migrations } from './migration-csv/migration';

const db = knex(config);

export const initDB = async () => {
  await migrations(db)
}

export const knexDB = db