import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { GetUserByEmailService } from '../../services/get-user-by-email.service'

describe('GetUserByEmailService Unit Test', () => {
	let service: GetUserByEmailService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetUserByEmailService,
				{
					provide: IUserRepository,
					useValue: {
						getUserByEmail: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<GetUserByEmailService>(GetUserByEmailService)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return a user by email', async () => {
		const user = { id: 1, email: 'test@test.com' } as Users
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(user)

		const result = await service.execute('test@test.com')
		expect(result).toEqual(user)
		expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
			'test@test.com',
		)
	})

	it('should return undefined if user not found', async () => {
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(
			undefined,
		)

		const result = await service.execute('notfound@test.com')
		expect(result).toBeUndefined()
		expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
			'notfound@test.com',
		)
	})
})
