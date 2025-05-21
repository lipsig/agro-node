# Agro Node - Gerenciamento de Produtores Rurais

Este projeto é uma aplicação completa para o cadastro e gestão de produtores rurais, propriedades, safras e culturas, com dashboard visual, API documentada via Swagger e ambiente pronto para Docker/PostgreSQL.

## Funcionalidades

- **Cadastro, edição e exclusão de produtores rurais**
  - Validação de CPF ou CNPJ
- **Gestão de fazendas (propriedades)**
  - Nome, cidade, estado, áreas (total, agricultável, vegetação)
  - Validação: soma das áreas agricultável e vegetação não pode exceder a área total
- **Gestão de safras**
  - Ex: Safra 2021, Safra 2022
- **Gestão de culturas plantadas**
  - Ex: Soja na Safra 2021, Milho na Safra 2022
  - Uma fazenda pode ter várias culturas por safra
- **Relacionamentos**
  - Um produtor pode ter várias fazendas
  - Uma fazenda pode ter várias culturas e safras
- **Dashboard visual**
  - Total de fazendas cadastradas
  - Total de hectares registrados
  - Gráficos de pizza: por estado, por cultura, por uso do solo
- **API RESTful documentada com Swagger**
- **Ambiente pronto para Docker**
  - Banco de dados PostgreSQL
  - Containers para API, seed, testes e dashboard
- **Testes automatizados**
  - Testes unitários e de integração cobrindo regras de negócio e endpoints principais

## Entidades

- **Producer** (Produtor Rural)
  - id, document (CPF/CNPJ), name, farms
- **Farm** (Fazenda/Propriedade)
  - id, name, city, state, total_area, agricultural_area, vegetation_area, producer, crops, harvests
- **Harvest** (Safra)
  - id, name, farm, crops
- **Crop** (Cultura Plantada)
  - id, name, farm, harvest

## Endpoints Principais

| Entidade   | Método | Rota                | Descrição                   |
|------------|--------|---------------------|-----------------------------|
| Producer   | GET    | `/producers`        | Listar produtores           |
|            | POST   | `/producers`        | Criar produtor              |
|            | GET    | `/producers/:id`    | Detalhar produtor           |
|            | PUT    | `/producers/:id`    | Atualizar produtor          |
|            | DELETE | `/producers/:id`    | Remover produtor            |
| Farm       | GET    | `/farms`            | Listar fazendas             |
|            | POST   | `/farms`            | Criar fazenda               |
|            | GET    | `/farms/:id`        | Detalhar fazenda            |
|            | PUT    | `/farms/:id`        | Atualizar fazenda           |
|            | DELETE | `/farms/:id`        | Remover fazenda             |
| Harvest    | GET    | `/harvests`         | Listar safras               |
|            | POST   | `/harvests`         | Criar safra                 |
|            | GET    | `/harvests/:id`     | Detalhar safra              |
|            | PATCH  | `/harvests/:id`     | Atualizar safra             |
|            | DELETE | `/harvests/:id`     | Remover safra               |
| Crop       | GET    | `/crops`            | Listar culturas             |
|            | POST   | `/crops`            | Criar cultura               |
|            | GET    | `/crops/:id`        | Detalhar cultura            |
|            | PATCH  | `/crops/:id`        | Atualizar cultura           |
|            | DELETE | `/crops/:id`        | Remover cultura             |

## Documentação da API

- **Swagger disponível em:**  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Dashboard

- **Dashboard visual disponível em:**  
  [http://localhost:3000/](http://localhost:3000/)
- Permite CRUD completo via interface web e exibe gráficos e totais em tempo real.

## Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repo-url>
   cd agro-node
   ```

2. **Suba os containers**
   ```bash
   docker compose up --build
   ```
   - Aguarde o container `db` (PostgreSQL) iniciar.
   - O backend NestJS será iniciado em seguida.
   - **Após o carregamento da aplicação, um seed automático é executado para popular o banco de dados com dados de exemplo.**
   - O dashboard estará disponível em `http://localhost:3000/`.

3. **Acessar a API e Dashboard**
   - **Dashboard:** [http://localhost:3000/](http://localhost:3000/)
   - **Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

4. **Rodar testes**
   ```bash
   docker compose run --rm e2e
   ```

### Variáveis de ambiente

Veja `.env.example` para configuração do banco de dados (já pronto para uso com Docker).

## Tecnologias utilizadas

- **NestJS** (Node.js, TypeScript)
- **TypeORM**
- **PostgreSQL**
- **Docker & Docker Compose**
- **Swagger (OpenAPI)**
- **Dashboard frontend estático (HTML/JS/CSS)**

## Testes automatizados

O projeto possui testes unitários e de integração para garantir a qualidade das regras de negócio e dos endpoints da API. Os testes cobrem cenários como validação de CPF/CNPJ, regras de área das fazendas, relacionamentos entre entidades e operações CRUD.

Para rodar os testes:

```powershell
# Execute dentro do container ou localmente se preferir
npm run test           # Testes unitários
npm run test:e2e       # Testes de integração (e2e)
```

Ou via Docker Compose:

```powershell
docker compose run --rm e2e
```

## Observações

- O projeto é para fins didáticos e pode ser expandido facilmente.
- O banco de dados é reiniciado a cada novo `docker compose up` se o volume for removido.
- O dashboard consome a própria API REST para exibir e manipular dados.

---
