import { IAuth } from '@/application/interfaces/auth.interface'
import { ITokenClaims } from '@/presentation/auth/dto/token.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { VerifyTokenService } from '../../services/verify-token.service'

describe('VerifyTokenService Unit Test', () => {
	let service: VerifyTokenService
	let authService: IAuth

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VerifyTokenService,
				{
					provide: IAuth,
					useValue: {
						verifyToken: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<VerifyTokenService>(VerifyTokenService)
		authService = module.get<IAuth>(IAuth)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should call authService.verifyToken and return claims', async () => {
		const claims = { sub: 1, email: 'a@a.com' } as ITokenClaims
		jest.spyOn(authService, 'verifyToken').mockResolvedValueOnce(claims)

		const result = await service.execute('token')

		expect(authService.verifyToken).toHaveBeenCalledWith('token')
		expect(result).toBe(claims)
	})
})
