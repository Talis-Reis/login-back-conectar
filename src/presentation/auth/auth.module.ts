import { IAuth } from '@/application/interfaces/auth.interface'
import { JwtStrategy } from '@/application/use-cases/auth/guard/passport/jwt.strategy'
import { AuthService } from '@/application/use-cases/auth/services/auth.service'
import { CreateTokenService } from '@/application/use-cases/auth/services/create-token.service'
import { EnvModule } from '@/shared/common/infrastructure/config/env/env.module'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'

@Global()
@Module({
	imports: [
		EnvModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
			property: 'user',
			session: false,
		}),
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [IEnvConfig],
			useFactory: (env: IEnvConfig) => ({
				secret: env.getKeySecret(),
				signOptions: { expiresIn: env.getExpirationKey() },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: IAuth,
			useClass: AuthService,
		},
		CreateTokenService,
		JwtStrategy,
	],
	exports: [IAuth, JwtModule, PassportModule],
})
export class AuthModule {}
