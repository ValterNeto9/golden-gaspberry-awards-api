import { promisify } from 'util';
import * as fs from 'fs';
import { Knex } from 'knex';
import { parse } from 'csv-parse';

interface CSVRow {
  [key: string]: string | number; // Define o tipo de cada coluna
}

exports.up = async function (knex: Knex) {
  // 1. Ler o arquivo CSV
  const readFile = promisify(fs.readFile);
  const csvData = await readFile(`${__dirname}/movielist.csv`, 'utf8');

  // 2. Converter o CSV para um array de objetos
  const rows: CSVRow[] = [];

  await new Promise((resolve, reject) => {
    const parser = parse({
      delimiter: ';',
      columns: true
    });
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
};

exports.down = async function (knex: Knex) {
  // Reverta a migration, excluindo a tabela
  await knex.schema.dropTable('movies');
};