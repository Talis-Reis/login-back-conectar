import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvConfig } from '../../interface/env.interface'

@Injectable()
export class EnvService implements IEnvConfig {
	constructor(private readonly configService: ConfigService) {}

	getExpirationKey(): string {
		return this.configService.get<string>('EXPIRATION_KEY') || '1h'
	}

	getKeySecret(): string {
		return this.configService.get<string>('KEY_SECRET') || 'secretKey'
	}

	getDbHost(): string {
		return this.configService.get<string>('DATABASE_HOST') || 'localhost'
	}

	getDbName(): string {
		return this.configService.get<string>('DATABASE_NAME') || 'postgres'
	}

	getDbUsername(): string {
		return this.configService.get<string>('DATABASE_USERNAME') || 'postgres'
	}

	getDbPassword(): string {
		return this.configService.get<string>('DATABASE_PASSWORD') || '1234'
	}

	getDbPort(): number {
		const port: number = Number(
			this.configService.get<number>('DATABASE_PORT'),
		)
		return isNaN(port) ? 5432 : port
	}

	getDbSsl(): boolean {
		return this.configService.get<string>('DATABASE_SSL') === 'true'
	}

	getAppPort(): number {
		const port: number = Number(this.configService.get<string>('PORT'))
		return isNaN(port) ? 3000 : port
	}

	getNodeEnv(): string {
		return this.configService.get<string>('NODE_ENV') || 'development'
	}
}
