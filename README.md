# Golden Raspberry Awards - API
Lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards. 

## Requisitos:
* Node.js versão a partir da 14v LTS

## Passos para inicialização do projeto:

* verificar ou adicionar o arquivo .csv na pasta `src/database/migration-csv`
* rodar o comando para iniciar a migration do csv para o sqLite: `npm run knex:migrate`
* rodar o projeto: `npm start`

Seguindo esses passos, será possível acessar o endpoint: [http://localhost:3000/worst-movie/awards-interval](http://localhost:3000/worst-movie/awards-interval)