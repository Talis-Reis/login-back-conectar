import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateUserDTO } from '@/presentation/user/dto/user.dto'
import { MessageType } from '@/shared/common/@types/message.type'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUserService } from '../../services/update-user.service'

describe('UpdateUserService Unit Test', () => {
	let service: UpdateUserService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateUserService,
				{
					provide: IUserRepository,
					useValue: {
						getUserById: jest.fn(),
						getUserByEmail: jest.fn(),
						updateUser: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UpdateUserService>(UpdateUserService)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw NotFoundException if user does not exist', async () => {
		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			undefined,
		)

		await expect(service.execute(1, {} as UpdateUserDTO)).rejects.toThrow(
			NotFoundException,
		)
	})

	it('should throw NotFoundException if email is already registered', async () => {
		const existingUser = { id: 1, email: 'old@mail.com' } as Users
		const userByEmail = { id: 2, email: 'new@mail.com' } as Users
		const dto = { email: 'new@mail.com' } as UpdateUserDTO

		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			existingUser,
		)
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(
			userByEmail,
		)

		await expect(service.execute(1, dto)).rejects.toThrow(NotFoundException)
	})

	it('should update user and return success message', async () => {
		const existingUser = { id: 1, email: 'old@mail.com' } as Users
		const dto = {
			email: 'old@mail.com',
			firstName: 'Primeiro Nome',
			lastName: 'Ultimo Nome',
		} as UpdateUserDTO

		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			existingUser,
		)
		jest.spyOn(userRepository, 'updateUser').mockResolvedValueOnce(
			undefined,
		)

		const result = await service.execute(1, dto)

		expect(userRepository.getUserById).toHaveBeenCalledWith(1)
		expect(userRepository.updateUser).toHaveBeenCalledWith(1, dto)
		expect(result).toEqual({
			message: 'Usuário atualizado com sucesso.',
		} as MessageType)
	})

	it('should update user and return success message if email is changed and not taken', async () => {
		const existingUser = { id: 1, email: 'old@mail.com' } as Users
		const dto = {
			email: 'new@mail.com',
			firstName: 'Primeiro Nome',
			lastName: 'Ultimo Nome',
		} as UpdateUserDTO

		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			existingUser,
		)
		jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(
			undefined,
		)
		jest.spyOn(userRepository, 'updateUser').mockResolvedValueOnce(
			undefined,
		)

		const result = await service.execute(1, dto)

		expect(userRepository.getUserById).toHaveBeenCalledWith(1)
		expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
			'new@mail.com',
		)
		expect(userRepository.updateUser).toHaveBeenCalledWith(1, dto)
		expect(result).toEqual({
			message: 'Usuário atualizado com sucesso.',
		} as MessageType)
	})
})
