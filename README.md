# Desafio Back-end Clicksoft

# Pre-requisitos

- Nodejs >= v14.16.1
- yarn >= 1.22.10 ou npm >= 6.14.12
- Docker >= 20.10.8
- docker-compose >= 1.25.0
- Postgresql >= 13.1

# 1. Execução

O primeiro passo é clonar o repsitório.

    $ git clone https://github.com/eliseukadesh67/desafio-clicksoft.git


Para executar a api, existem duas opções, utilizando docker com o servidor e banco configurados, ou configurando seu banco local, rodar as migrations, e utilizar yarn ou npm

### 1. Utilizando Docker

Na pasta raiz do projeto execute o seguinte comando para subir o container da api junto com um banco de dados postgresql.

    docker-compose up

E pronto, a aplicação ja esta funcionando, e escutando na porta 3333. :)

### 2. Utilizando yarn ou npm

### Yarn

Primeiro instalar as dependencias

    yarn

Depois é necessario rodar as migrations do banco de dados utilizando o seguinte comando

    yarn migrate

Depois subir o servidor

    yarn run dev

ou

    yarn start

### Npm


Primeiro instalar as dependencias

    npm install

Depois subir o servidor

    npm run dev
ou

    npm start

# 2. Configuração do banco de dados

Se a opção de rodar a aplicação utilizando o docker for escolhida, na imagem docker da api e do banco de dados, ja estão com todas as credenciais e dependencias configuradas.

Mas Caso queira rodar a apliação sem utilizar o docker primeiro é necessario configurar um banco de dados Postgresql localmente e apos configura-lo atualizar as credenciais no arquivo .env na raiz do projeto.

    PORT=3333
    HOST=0.0.0.0
    NODE_ENV=development
    APP_KEY=NHXxvDfOfJJ1wnBpGPlkuZ107B_tpFUh
    DRIVE_DISK=local
    DB_CONNECTION=pg
    PG_HOST=localhost
    PG_PORT=<porta-do-banco-local>
    PG_USER=<usuario-do-banco-local>
    PG_PASSWORD=<senha-do-banco-local>
    PG_DB_NAME=<nome-do-banco-local>
