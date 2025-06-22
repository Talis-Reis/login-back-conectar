FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
RUN npm install --only=development

COPY --from=builder /app/dist/. ./
EXPOSE 3000

COPY .docker/entry.sh /app/entry.sh
ENTRYPOINT ["sh", "entry.sh"]