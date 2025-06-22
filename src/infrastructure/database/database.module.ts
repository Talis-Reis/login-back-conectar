import { Global, Module } from '@nestjs/common'
import { DataBaseConfig } from './config/database-config'
import { databaseConnection } from './providers/database-connection.provider'
import { userProvider } from './providers/user.provider'

@Global()
@Module({
	providers: [DataBaseConfig, ...databaseConnection, ...userProvider],
	exports: [...databaseConnection, ...userProvider],
})
export class DatabaseModule {}
