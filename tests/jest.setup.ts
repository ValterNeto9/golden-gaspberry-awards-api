import supertest from 'supertest';
import { app } from '../src/app'
import { Knex } from '../src/database';

beforeAll(async () => {
    await Knex.migrate.latest();
  });
  
  afterAll(async () => {
    await Knex.destroy();
  });

export const testServer = supertest(app)