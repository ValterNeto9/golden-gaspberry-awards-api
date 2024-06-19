import * as fs from 'fs';
import { Knex } from 'knex';
import { parse } from 'csv-parse';

interface CSVRow {
  [key: string]: string | number; // Define o tipo de cada coluna
}
export const migrations = async function (knex: Knex) {
  // 1. Ler o arquivo CSV usando stream
  const csvStream = fs.createReadStream(`${__dirname}/movielist.csv`, 'utf8');

  // 2. Converter o CSV para um array de objetos com validação
  const rows: CSVRow[] = [];
  let errorOccurred = false;

  csvStream
    .pipe(parse({ delimiter: ';', columns: true }))
    .on('data', (row: CSVRow) => {
      rows.push(row);
    })
    .on('error', (err: any) => {
      console.error('Erro durante o parsing do CSV:', err);
      errorOccurred = true;
    })
    .on('end', async () => {
      if (errorOccurred) {
        console.error('Erro durante a migração. A migração foi interrompida.');
        return;
      }

      try {
        // 3. Criar a tabela no banco de dados
        await knex.schema.createTable('movies', (table) => {
          table.bigIncrements('id').primary().index();
          table.integer('year')
          table.string('title')
          table.string('studios')
          table.string('producers')
          table.string('winner')
        });

        // 5. Inserir os dados do CSV na tabela
        await knex('movies').insert(rows);
        console.log('Dados migrados com sucesso!');
        
      } catch (error) {
        console.error('Erro durante a inserção dos dados:', error);
      }
    });
    csvStream.close();
};

exports.down = async function (knex: Knex) {
  // Reverta a migration, excluindo a tabela
  await knex.schema.dropTable('movies');
};