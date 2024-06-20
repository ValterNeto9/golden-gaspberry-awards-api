import express from 'express'
import { router } from './routes'
import * as dotenv from 'dotenv';
import { Knex } from './database';
dotenv.config();

const app = express()

app.use(express.json())

app.use(router)

const migrationInit = async () => {
    try {
        await Knex.migrate.latest();
      } catch (err) {
        console.error('Erro ao executar as migrations:', err);
        process.exit(1);
      }
}

if(process.env.NODE_ENV !== 'test') {
    migrationInit()
    .then(() => console.info('Migrations realizadas com sucesso.'))
}

export { app }
