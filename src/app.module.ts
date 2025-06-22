import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/database.module'
import { AuthModule } from './presentation/auth/auth.module'
import { UserModule } from './presentation/user/user.module'
import { EnvModule } from './shared/common/infrastructure/config/env/env.module'
@Module({
	imports: [
		//Configs
		EnvModule,
		DatabaseModule,

		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
