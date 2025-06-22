import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { loadEnvironment } from '../../../shared/common/infrastructure/config/env/env.loader'

loadEnvironment()

const configService = new ConfigService()

export default new DataSource({
	type: 'postgres',
	host: configService.get('DATABASE_HOST') || 'localhost',
	port: configService.get('DATABASE_PORT') || 5432,
	username: configService.get('DATABASE_USERNAME') || 'postgres',
	password: configService.get('DATABASE_PASSWORD') || '1234',
	database: configService.get('DATABASE_NAME') || 'postgres',
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/../**/migrations/*.{ts,js}`],
})
