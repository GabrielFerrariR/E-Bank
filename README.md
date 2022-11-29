<h1 align="center"> Desafio NG Cash </h1>

## Sobre

Desafio fullstack proposto pela empresa NGCash.

## Tecnologias utilizadas

Os README.md presentes nas pastas client/ e api/ detalham a respeito das tecnologias utilizadas.

## Rodando o projeto

Necessário: Docker e docker-compose

Execute o script de inicialização na pasta raiz:

```bash
npm start 
## o compose na pasta raiz irá iniciar toda a aplicação, com banco, client e api funcionais 
```

> Obs: O script start navega para as pastas client e api e instala suas dependências, em seguida executa o docker-compose presente na raiz do projeto, você pode optar por fazer isso manualmente

Se o compose foi executado corretamente, você pode acessar a aplicação em: http://localhost:3000/