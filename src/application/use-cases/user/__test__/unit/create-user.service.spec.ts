import { IUserRepository } from '@/application/interfaces/user.inteface'
import { InputUserDTO } from '@/presentation/user/dto/user.dto'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserService } from '../../services/create-user.service'

describe('CreateUserService Unit Test', () => {
	let service: CreateUserService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateUserService,
				{
					provide: IUserRepository,
					useValue: {
						getUserByEmail: jest.fn(),
						createUser: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<CreateUserService>(CreateUserService)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw if email already exists', async () => {
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(
			{} as any,
		)
		await expect(
			service.execute({ email: 'test@test.com' } as InputUserDTO),
		).rejects.toThrow(BadRequestException)
	})

	it('should create user if email does not exist', async () => {
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(null)
		jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(
			{} as any,
		)
		const result = await service.execute({
			email: 'test@test.com',
			password: 'Password1!',
			firstName: 'Test',
			lastName: 'User',
			roles: ['user'],
		})
		expect(result).toEqual({ message: 'Usuário criado com sucesso.' })
	})
})
