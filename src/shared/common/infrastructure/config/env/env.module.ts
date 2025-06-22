import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { join } from 'node:path'
import { IEnvConfig } from '../../interface/env.interface'
import { EnvService } from './env.service'

@Global()
@Module({
	imports: [ConfigModule],
	providers: [EnvService, { provide: IEnvConfig, useExisting: EnvService }],
	exports: [{ provide: IEnvConfig, useClass: EnvService }],
})
export class EnvModule extends ConfigModule {
	static forRoot<ValidationOptions extends Record<string, any>>(
		options?: ConfigModuleOptions<ValidationOptions>,
	): Promise<DynamicModule> {
		return super.forRoot({
			...options,
			envFilePath: [
				join(__dirname, `../../../../../.env.${process.env.NODE_ENV}`),
			],
		})
	}
}
