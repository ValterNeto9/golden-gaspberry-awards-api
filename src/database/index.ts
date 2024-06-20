import { knex } from 'knex';
import { development, test } from './Environments';
import * as dotenv from 'dotenv';

const getEnvironment = () => {
  dotenv.config();

  switch (process.env.NODE_ENV) {
    case 'test': return test;
    default: return development;
  }
};

export const Knex = knex(getEnvironment());