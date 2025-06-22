import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { DataSource, DataSourceOptions } from 'typeorm'
import { DataBaseConfig } from '../config/database-config'

export const databaseConnection = [
	{
		provide: 'DATABASE_CONECTAR_CONNECTION',
		useFactory: (dbConfig: DataBaseConfig, envConfig: IEnvConfig) => {
			const dbName: string = envConfig.getDbName()
			const options: DataSourceOptions = dbConfig.getConfig(dbName)

			const dataSource: DataSource = new DataSource({
				...options,
			})

			return dataSource.initialize()
		},
		inject: [DataBaseConfig, IEnvConfig],
	},
]
