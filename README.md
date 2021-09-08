# Desafio Back-end Clicksoft
 
# Pre-requisitos
 
- nodejs >= v14.16.1
- yarn >= 1.22.10 ou npm >= 6.14.12
- docker >= 20.10.8
- docker-compose >= 1.25.0
- Postgresql >= 13.1
 
# 1. Execução
 
O primeiro passo é clonar o repositório.
 
    $ git clone https://github.com/eliseukadesh67/desafio-clicksoft.git
 
 
Para executar a api, existem duas opções, utilizar docker com o servidor e banco de dados configurados, ou configurar seu banco local, rodar as migrations, e utilizar yarn ou npm
 
### 1. Utilizando Docker
 
Na pasta raiz do projeto execute o seguinte comando para subir o container da api junto com um banco de dados postgresql.
 
    docker-compose up
 
E pronto, a aplicação já está funcionando, e escutando na porta 3333.
 
### 2. Utilizando yarn ou npm
 
### Yarn
 
Primeiro instalar as dependências
 
    yarn
 
Depois é necessário rodar as migrations do banco de dados utilizando o seguinte comando
 
    yarn migrate
 
Depois subir o servidor
 
    yarn run dev
 
ou
 
    yarn start
 
### Npm
 
 
Primeiro instalar as dependências
 
    npm install
 
Depois subir o servidor
 
    npm run dev
ou
 
    npm start
 
# 2. Configuração do banco de dados
 
Se optar por utilizar o docker para subir a aplicação, a imagem docker da API e do banco de dados, já estão com todas as credenciais e dependências configuradas.
 
Mas Caso queira rodar a aplicação sem utilizar o docker, primeiro é necessário configurar um banco de dados Postgresql localmente e após configurá-lo atualizar as credenciais no arquivo .env na raiz do projeto.
 
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

# 4. Insomnia

Na raiz do projeto terá uma pasta chamada **Insomnia** e nela existe um arquivo no formato JSON que será utilizado no Insomnia para testar as rotas da aplicação.
