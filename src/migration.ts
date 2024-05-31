import { promisify } from 'util';
import * as fs from 'fs';
import { Knex } from 'knex';
import csvParser from 'csv-parser';

interface CSVRow {
  [key: string]: string | number; // Define o tipo de cada coluna
}

exports.up = async function (knex: Knex) {
  // 1. Ler o arquivo CSV
  const readFile = promisify(fs.readFile);
  const csvData = await readFile('./movielist.csv', 'utf8'); // Substitua 'data.csv' pelo nome do seu arquivo

  // 2. Converter o CSV para um array de objetos
  const rows: CSVRow[] = [];
  await new Promise((resolve, reject) => {
    const parser = csvParser();
    parser.on('data', (row: CSVRow) => {
      rows.push(row);
    });
    parser.on('end', () => {
      resolve(true);
    });
    parser.on('error', (err: any) => {
      reject(err);
    });
    parser.write(csvData);
    parser.end();
  });

  // 3. Criar a tabela no banco de dados
  await knex.schema.createTable('your_table_name', (table) => {
    // 4. Definir as colunas da tabela com base nas colunas do CSV
    // Exemplo:
    table.string('column1').notNullable();
    table.integer('column2');
    // ... outras colunas
  });

  // 5. Inserir os dados do CSV na tabela
  await knex('your_table_name').insert(rows);
};

exports.down = async function (knex: Knex) {
  // Reverta a migration, excluindo a tabela
  await knex.schema.dropTable('your_table_name');
};