import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateAccessUserDTO } from '@/presentation/user/dto/user.dto'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateAccessUserService } from '../../services/update-access-user.service'

describe('UpdateAccessUserService Unit Test', () => {
	let service: UpdateAccessUserService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateAccessUserService,
				{
					provide: IUserRepository,
					useValue: {
						getUserByEmail: jest.fn(),
						updateAcessUser: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UpdateAccessUserService>(UpdateAccessUserService)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw NotFoundException if user does not exist', async () => {
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(
			undefined,
		)

		await expect(
			service.execute(1, 'notfound@test.com', {} as UpdateAccessUserDTO),
		).rejects.toThrow(NotFoundException)
	})

	it('should call updateAcessUser if user exists', async () => {
		const user = { id: 1, email: 'test@test.com' } as Users
		const dto = {
			firstAccess: new Date(),
			lastAccess: new Date(),
		} as UpdateAccessUserDTO

		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(user)
		const updateSpy = jest
			.spyOn(userRepository, 'updateAcessUser')
			.mockResolvedValueOnce(undefined)

		await service.execute(1, 'test@test.com', dto)

		expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
			'test@test.com',
		)
		expect(updateSpy).toHaveBeenCalledWith(1, dto)
	})
})
