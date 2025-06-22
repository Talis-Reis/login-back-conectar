import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdatePermissionsUserDTO } from '@/presentation/user/dto/user.dto'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdatePermissionUserService } from '../../services/update-permission-user.service'

describe('UpdatePermissionUserService Unit Test', () => {
	let service: UpdatePermissionUserService
	let userRepository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdatePermissionUserService,
				{
					provide: IUserRepository,
					useValue: {
						getUserById: jest.fn(),
						updatePermissionUser: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UpdatePermissionUserService>(
			UpdatePermissionUserService,
		)
		userRepository = module.get<IUserRepository>(IUserRepository)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw NotFoundException if user does not exist', async () => {
		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(
			undefined,
		)

		await expect(
			service.execute(1, {} as UpdatePermissionsUserDTO),
		).rejects.toThrow(NotFoundException)
	})

	it('should update permissions and return success message if user exists', async () => {
		const user = { id: 1, email: 'test@test.com' } as Users
		const dto = { roles: ['admin'] } as UpdatePermissionsUserDTO

		jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(user)
		const updateSpy = jest
			.spyOn(userRepository, 'updatePermissionUser')
			.mockResolvedValueOnce(undefined)

		const result = await service.execute(1, dto)

		expect(userRepository.getUserById).toHaveBeenCalledWith(1)
		expect(updateSpy).toHaveBeenCalledWith(1, dto)
		expect(result).toEqual({
			message: 'Permissões do usuário atualizadas com sucesso.',
		})
	})
})
