import { knex } from 'knex';

import { development, test } from './Environments';

const getEnvironment = () => {
  switch (process.env.ENVIRONMENT) {
    case 'test': return test;
    default: return development;
  }
};

export const Knex = knex(getEnvironment());