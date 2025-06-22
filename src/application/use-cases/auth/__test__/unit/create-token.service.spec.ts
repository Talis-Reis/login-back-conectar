import { IAuth } from '@/application/interfaces/auth.interface'
import { Users } from '@/domain/models/users.entity'
import { LoginDTO } from '@/presentation/auth/dto/auth.dto'
import * as passwordUtils from '@/shared/utils/password'
import { UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { GetUserByEmailService } from '../../../user/services/get-user-by-email.service'
import { UpdateAccessUserService } from '../../../user/services/update-access-user.service'
import { CreateTokenService } from '../../services/create-token.service'

describe('CreateTokenService Unit Test', () => {
	let service: CreateTokenService
	let authService: IAuth
	let getUserByEmailService: GetUserByEmailService
	let updateAccessUserService: UpdateAccessUserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateTokenService,
				{
					provide: IAuth,
					useValue: {
						createToken: jest.fn(),
					},
				},
				{
					provide: GetUserByEmailService,
					useValue: {
						execute: jest.fn(),
					},
				},
				{
					provide: UpdateAccessUserService,
					useValue: {
						execute: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<CreateTokenService>(CreateTokenService)
		authService = module.get<IAuth>(IAuth)
		getUserByEmailService = module.get<GetUserByEmailService>(
			GetUserByEmailService,
		)
		updateAccessUserService = module.get<UpdateAccessUserService>(
			UpdateAccessUserService,
		)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw UnauthorizedException if user not found', async () => {
		jest.spyOn(getUserByEmailService, 'execute').mockResolvedValueOnce(
			undefined,
		)

		await expect(
			service.execute({
				email: 'notfound@mail.com',
				password: '123',
			} as LoginDTO),
		).rejects.toThrow(UnauthorizedException)
	})

	it('should throw UnauthorizedException if password is incorrect', async () => {
		const user = {
			id: 1,
			email: 'a@a.com',
			password: 'hashed',
			roles: [],
			firstAccess: null,
		} as Users
		jest.spyOn(getUserByEmailService, 'execute').mockResolvedValueOnce(user)
		jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(
			false,
		)

		await expect(
			service.execute({
				email: 'a@a.com',
				password: 'wrong',
			} as LoginDTO),
		).rejects.toThrow(UnauthorizedException)
	})

	it('should return accessToken and update user access', async () => {
		const user = {
			id: 1,
			email: 'a@a.com',
			password: 'hashed',
			roles: ['user'],
			firstAccess: null,
		} as Users

		jest.spyOn(getUserByEmailService, 'execute').mockResolvedValueOnce(user)
		jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(true)
		jest.spyOn(authService, 'createToken').mockResolvedValueOnce('token')
		const updateSpy = jest
			.spyOn(updateAccessUserService, 'execute')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute({
			email: 'a@a.com',
			password: '123',
		} as LoginDTO)

		expect(getUserByEmailService.execute).toHaveBeenCalledWith('a@a.com')
		expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
			'123',
			'hashed',
		)
		expect(authService.createToken).toHaveBeenCalledWith(
			expect.objectContaining({
				sub: 1,
				email: 'a@a.com',
				authorization: ['user'],
			}),
		)
		expect(updateSpy).toHaveBeenCalled()
		expect(result).toEqual({ accessToken: 'token' })
	})
})
