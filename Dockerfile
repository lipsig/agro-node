# Etapa 1: Build do backend NestJS
FROM node:18 AS api-build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./  
RUN npm install

COPY . . 

RUN npm run build

# Rode apenas testes unitários no build
RUN npm run test

EXPOSE 3000

# Healthcheck: espera resposta HTTP 200 da API
HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "run", "start:prod"]