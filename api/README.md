
<h1 align="center"> Bank API </h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


</div>

## Sobre

API responsável por alimentar o client do projeto, nela é possível manipular as entidades Users, Accounts e Transcactions do banco.

Foi  utilizado a arquitetura MSC para organização da aplicação e o padrão REST para criação da API.

## Tecnologias utilizadas

- TypeScript
- Node.js
- Express.js para criação da API
- Postgres com Sequelize
- Mocha, Chai, chai-http, nyc e Sinon para testes unitários e de integração
- Zod para validação de objetos e tipagem
- JWT e Bcrypt para emcriptação de senhas
- ESLint para assegurar qualidade do código

## Documentação

[Documentação do Postman](https://www.postman.com/cloudy-satellite-23795/workspace/ngcash/request/24296482-d918d55f-9be7-4f8f-8d91-c170c15980bc);

Há dois arquivos thunder-collection.json caso opte por importar a documentação.

## Rodando testes

Na pasta api:

```bash
npm test ## verifica os testes unitários
npm run test:coverage ## verifica a cobertura de testes
npm run test:integration ## testa os testes de integração
```

Outros scripts:

```bash
npm run db:reset ## Reinicia o banco, migration e seeders caso necessário

npm run dev # Inicia a aplicaçao express, caso você já tenha rodado o docker-compose esse comando não irá funcionar
```

> A aplicação está funcionando na porta 3001, caso queira fazer alguma modificação de rota, acesse o docker-compose na raiz do projeto e altere as variáveis de ambiente