import { ConfigService } from '@nestjs/config'
import { EnvService } from '../../env.service'

describe('EnvService', () => {
	let envService: EnvService
	let configService: jest.Mocked<ConfigService>

	beforeEach(() => {
		configService = {
			get: jest.fn(),
		} as any

		envService = new EnvService(configService)
	})

	it('getExpirationKey deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('2h')
		expect(envService.getExpirationKey()).toBe('2h')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getExpirationKey()).toBe('1h')
	})

	it('getKeySecret deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('mySecret')
		expect(envService.getKeySecret()).toBe('mySecret')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getKeySecret()).toBe('secretKey')
	})

	it('getDbHost deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('dbhost')
		expect(envService.getDbHost()).toBe('dbhost')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbHost()).toBe('localhost')
	})

	it('getDbName deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('dbname')
		expect(envService.getDbName()).toBe('dbname')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbName()).toBe('postgres')
	})

	it('getDbUsername deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('dbuser')
		expect(envService.getDbUsername()).toBe('dbuser')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbUsername()).toBe('postgres')
	})

	it('getDbPassword deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('dbpass')
		expect(envService.getDbPassword()).toBe('dbpass')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbPassword()).toBe('1234')
	})

	it('getDbPort deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('5555')
		expect(envService.getDbPort()).toBe(5555)

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbPort()).toBe(5432)

		configService.get.mockReturnValueOnce('notANumber')
		expect(envService.getDbPort()).toBe(5432)
	})

	it('getDbSsl deve retornar true se config for "true"', () => {
		configService.get.mockReturnValueOnce('true')
		expect(envService.getDbSsl()).toBe(true)

		configService.get.mockReturnValueOnce('false')
		expect(envService.getDbSsl()).toBe(false)

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getDbSsl()).toBe(false)
	})

	it('getAppPort deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('4000')
		expect(envService.getAppPort()).toBe(4000)

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getAppPort()).toBe(3001)

		configService.get.mockReturnValueOnce('notANumber')
		expect(envService.getAppPort()).toBe(3001)
	})

	it('getNodeEnv deve retornar valor do config ou padrão', () => {
		configService.get.mockReturnValueOnce('production')
		expect(envService.getNodeEnv()).toBe('production')

		configService.get.mockReturnValueOnce(undefined)
		expect(envService.getNodeEnv()).toBe('development')
	})
})
