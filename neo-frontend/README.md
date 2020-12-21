# Projeto modelo para aplicações ReactJS com Docker

## Versão do NodeJS recomendada: 14.15.0

## Configurando novo projeto

### Passo 1:

Desabilitar o `WSL2` do docker.

### Passo 2:

Alterar as variáveis de ambiente nos arquivos `.env` e `.env.development`.

### Passo 3:

Alterar o valor do atributo `ports` nos arquivos `docker-compose-prod.yml` e `docker-compose.yml` informando as portas que serão utilizadas em produção e em desenvolvimento respectivamente.

### Passo 4:

Alterar o valor do atributo `EXPOSE` nos arquivos `Dockerfile-prod` e `Dockerfile` informando as portas que serão utilizadas em produção e em desenvolvimento respectivamente.

### Passo 5:

Navega até a pasta `src/store`, abrir o arquivo `persistReducer.js` e alterar o valor do atributo `key` com o nome do projeto.

## Instalando o projeto

### Passo 1:

Executar o comando `yarn` para instalar as dependências.

### Passo 2:

Executar os comandos `yarn install-project` para subir o projeto com o docker ou `yarn start` para subir o projeto sem o docker.
