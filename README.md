# API de Gerenciamento de Usuários e Tarefas

Esta é uma API RESTful simples, desenvolvida em Node.js com TypeScript, para gerenciar usuários e suas respectivas tarefas.

## 🎯 Objetivo

O projeto visa demonstrar conhecimentos práticos em Node.js, TypeScript, estrutura de projetos, integração com banco de dados PostgreSQL utilizando o ORM Prisma e boas práticas no desenvolvimento de APIs REST.

## ⚙️ Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript no servidor.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
-   **Express**: Framework para a construção da API.
-   **PostgreSQL**: Banco de dados relacional.
-   **Docker**: Para containerização do banco de dados.
-   **Prisma**: ORM para Node.js e TypeScript.
-   **Zod**: Para validação de esquemas de dados.
-   **Swagger**: Para documentar a API e fazer testes.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/diegohfcelestino/task-manager.git](https://github.com/diegohfcelestino/task-manager.git)
    cd task-manager
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Inicie o container do PostgreSQL com Docker:**
    Este comando irá baixar a imagem do PostgreSQL e iniciar o banco de dados em segundo plano.
    ```bash
    docker-compose up -d
    ```

4.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env`. As variáveis já estão configuradas para se conectar com o container Docker.
    ```bash
    cp .env.example .env
    ```
    *(No Windows, se o comando `cp` não funcionar no CMD, use `copy .env.example .env`)*

5.  **Gere o Cliente Prisma:**
    Este passo é essencial! Ele gera o código do Prisma Client com base no `schema.prisma`.
    ```bash
    npx run prisma:generate
    ```

6.  **Execute as migrações do banco de dados:**
    Este comando irá criar as tabelas `User` e `Task` no banco de dados, com base no schema do Prisma.
    ```bash
    npx run prisma:migrate
    ```

7.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```

8.  **Inicie o prisma studio:**
    Este comando irá abrir o prisma studio em seu navegador para acompanhar e consultar os dados que estão sendo cadastrados no banco de dados, pode ser executado em outro terminal (dentro da pasta do projeto).
    ```bash
    npm run prisma:studio
    ```


A API estará rodando em `http://localhost:3000`.


## 📄 Documentação da API (Swagger)

A Documentação estará rodando local em `http://localhost:3000/api-docs` e pode ser usada para testar todos os metodos.


## Mas ela também está publicada em `https://task-manager-api-mkj6.onrender.com/api-docs`, basta acessar o link e testar online.

### Ao acessar a documentação do Swagger, sempre verificar o servidor selecionado:

Se estiver no local, selecione o `http://localhost:3000 - Servidor de Desenvolvimento`,
Se estiver no produção, selecione o `https://task-manager-api-mkj6.onrender.com - Servidor de Produção`


## Endpoints da API

### 👤 Usuários

| Método  | Rota         | Descrição                    | Corpo da Requisição (Exemplo)                             |
| :------ | :----------- | :--------------------------- | :-------------------------------------------------------- |
| `POST`  | `/users`     | Cria um novo usuário.        | `{ "name": "Usuario", "email": "juserteste@example.com" }`|
| `GET`   | `/users`     | Lista todos os usuários.     | -                                                         |
| `GET`   | `/users/:id` | Busca um usuário específico.  | -                                                         |
| `PUT`   | `/users/:id` | Atualiza um usuário.         | `{ "name": "Usuario Novo" }`                              |
| `DELETE`|`/users/:id`  | Deleta um usuário.           | -                                                         |

### ✅ Tarefas

| Método | Rota        | Descrição                        | Corpo da Requisição (Exemplo)                                         |
| :----- | :---------- | :------------------------------- | :-------------------------------------------------------------------- |
| `POST` | `/tasks`    | Cria uma nova tarefa.            | `{ "title": "Minha Tarefa", "description": "...", "userId": "c..." }` |
| `GET`  | `/tasks`    | Lista todas as tarefas.          | -                                                                     |
| `GET`  | `/tasks/:id`| Busca uma tarefa específica.      | -                                                                     |
| `PUT`  | `/tasks/:id`| Atualiza uma tarefa.             | `{ "status": "DONE" }`                                                |
| `DELETE`|`/tasks/:id`| Deleta uma tarefa.               | -                                                                     |


## ✨ Autor

Feito por **Diego Henrique Ferreira Celestino**.
Entre em contato!

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=link_do_seu_perfil_no_github)](https://github.com/diegohfcelestino)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/diego-ferreira-34b6348b/)](https://www.linkedin.com/in/diegohfcelestino/)
[![Whatsapp Badge](https://img.shields.io/badge/-Whatsapp-4CA143?style=flat-square&labelColor=4CA143&logo=whatsapp&logoColor=white&link=https://api.whatsapp.com/send?phone=+5516993535938&text=Hello!)](https://api.whatsapp.com/send?phone=+5516993535938&text=Hello!)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:diegohfcelestino@gmail.com)](mailto:diegohfcelestino@gmail.com)