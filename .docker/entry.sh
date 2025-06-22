#!/bin/sh
echo "Aguardando o banco de dados iniciar..."
until nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
  sleep 1
done

echo "Banco de dados disponível, rodando as migrations..."
npm run typeorm:run-migrations

echo "Iniciando a aplicação..."
npm run start:prod