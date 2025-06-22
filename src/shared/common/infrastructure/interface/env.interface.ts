export abstract class IEnvConfig {
	abstract getAppPort(): number
	abstract getNodeEnv(): string
	abstract getDbHost(): string
	abstract getDbName(): string
	abstract getDbPort(): number
	abstract getDbUsername(): string
	abstract getDbPassword(): string
	abstract getDbSsl(): boolean
	abstract getKeySecret(): string
	abstract getExpirationKey(): string
}
