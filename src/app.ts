import express from 'express'
import { initDB } from './database'
import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

/* initDB()
.catch( error => console.error('Erro ao migrar dados', error)) */

async function initializeApp() {
    try {
        await initDB();
        console.log('Banco de dados inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao migrar dados', error);
    }
}

initializeApp();

export { app, initializeApp };
