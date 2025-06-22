import { ITokenClaims } from '@/presentation/auth/dto/token.dto'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../services/auth.service'

describe('AuthService Unit Test', () => {
	let service: AuthService
	let jwtService: JwtService
	let env: IEnvConfig

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn(),
						verify: jest.fn(),
					},
				},
				{
					provide: IEnvConfig,
					useValue: {
						getExpirationKey: jest.fn(),
						getKeySecret: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<AuthService>(AuthService)
		jwtService = module.get<JwtService>(JwtService)
		env = module.get<IEnvConfig>(IEnvConfig)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a token with correct options', async () => {
		const payload = { sub: 1, email: 'test@test.com' } as ITokenClaims
		jest.spyOn(env, 'getExpirationKey').mockReturnValue('1h')
		jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token')

		const result = await service.createToken(payload)

		expect(env.getExpirationKey).toHaveBeenCalled()
		expect(jwtService.sign).toHaveBeenCalledWith(payload, {
			expiresIn: '1h',
		})
		expect(result).toBe('signed-token')
	})

	it('should verify token and return decoded claims', async () => {
		const token = 'token'
		const decoded = { sub: 1, email: 'test@test.com' } as ITokenClaims
		jest.spyOn(env, 'getKeySecret').mockReturnValue('secret')
		jest.spyOn(jwtService, 'verify').mockReturnValue(decoded)

		const result = await service.verifyToken(token)

		expect(env.getKeySecret).toHaveBeenCalled()
		expect(jwtService.verify).toHaveBeenCalledWith(token, {
			secret: 'secret',
		})
		expect(result).toBe(decoded)
	})

	it('should throw UnauthorizedException if verify fails', async () => {
		const token = 'token'
		jest.spyOn(env, 'getKeySecret').mockReturnValue('secret')
		jest.spyOn(jwtService, 'verify').mockImplementation(() => {
			throw new Error('fail')
		})

		await expect(service.verifyToken(token)).rejects.toThrow(
			UnauthorizedException,
		)
	})
})
