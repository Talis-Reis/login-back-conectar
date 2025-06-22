import * as dotenv from 'dotenv'
import { existsSync } from 'fs'
import { resolve } from 'path'

export function loadEnvironment(): void {
	const env = process.env.NODE_ENV || 'development'
	const envFilePath = resolve(process.cwd(), `.env.${env}`)
	const defaultEnvFilePath = resolve(process.cwd(), '.env')
	const pathToLoad = existsSync(envFilePath)
		? envFilePath
		: defaultEnvFilePath

	dotenv.config({ path: pathToLoad })
}
