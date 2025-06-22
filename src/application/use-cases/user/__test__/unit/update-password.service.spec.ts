import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { MessageType } from '@/shared/common/@types/message.type'
import * as passwordUtils from '@/shared/utils/password'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdatePasswordService } from '../../services/update-password.service'

describe('UpdatePasswordService Unit Test', () => {
	let service: UpdatePasswordService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdatePasswordService,
				{
					provide: IUserRepository,
					useValue: {
						getUserById: jest.fn(),
						updatePasswordUser: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UpdatePasswordService>(UpdatePasswordService)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw NotFoundException if user does not exist', async () => {
		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			undefined,
		)

		await expect(service.execute(1, 'oldPass', 'newPass')).rejects.toThrow(
			NotFoundException,
		)
	})

	it('should throw BadRequestException if old password is incorrect', async () => {
		const user = { id: 1, password: 'hashed' } as Users
		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(user)
		jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(
			false,
		)

		await expect(
			service.execute(1, 'wrongOldPass', 'newPass'),
		).rejects.toThrow(BadRequestException)
	})

	it('should update password and return success message', async () => {
		const user = { id: 1, password: 'hashed' } as Users
		const newPasswordHash = 'newHashed'
		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(user)
		jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(true)
		jest.spyOn(passwordUtils, 'createPassword').mockResolvedValueOnce(
			newPasswordHash,
		)
		const updateSpy = jest
			.spyOn(userRepository, 'updatePasswordUser')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute(1, 'oldPass', 'newPass')

		expect(userRepository.getUserById).toHaveBeenCalledWith(1)
		expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
			'oldPass',
			'hashed',
		)
		expect(passwordUtils.createPassword).toHaveBeenCalledWith('newPass')
		expect(updateSpy).toHaveBeenCalledWith(1, newPasswordHash)
		expect(result).toEqual({
			message: 'Senha atualizada com sucesso',
		} as MessageType)
	})
})
