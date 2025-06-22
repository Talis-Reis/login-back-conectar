import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { Injectable } from '@nestjs/common'
import { DataSourceOptions } from 'typeorm'

@Injectable()
export class DataBaseConfig {
	constructor(private readonly envConfig: IEnvConfig) {}

	getConfig(database: string): DataSourceOptions {
		return {
			type: 'postgres',
			name: `db-${database}`,
			host: this.envConfig.getDbHost(),
			port: this.envConfig.getDbPort(),
			username: this.envConfig.getDbUsername(),
			password: this.envConfig.getDbPassword(),
			database,
			entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
			logging: ['query'],
			extra: this.envConfig.getDbSsl()
				? {
						ssl: { rejectUnauthorized: false },
						sslmode: 'require',
					}
				: {
						ssl: false,
					},
		}
	}
}
