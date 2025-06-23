import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { ResponseUserDTO } from '@/presentation/user/dto/user.dto'
import { NotFoundException } from '@nestjs/common'
import GetByIdService from '../../services/get-by-id.service'

describe('GetByIdService Unit Test', () => {
    let service: GetByIdService
    let userRepository: jest.Mocked<IUserRepository>

    beforeEach(() => {
        userRepository = {
            getUserById: jest.fn(),
        } as any

        service = new GetByIdService(userRepository)
    })

    it('deve retornar o usuário quando encontrado', async () => {
        const userMock = {
            id: 1,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'User',
            roles: ['admin'],
            firstAccess: null,
            lastAccess: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: '',
        } as Users

        userRepository.getUserById.mockResolvedValue(userMock)

        const result = await service.execute(1)

        expect(userRepository.getUserById).toHaveBeenCalledWith(1)
        expect(result).toBeInstanceOf(ResponseUserDTO)
        expect(result.id).toBe(userMock.id)
        expect(result.email).toBe(userMock.email)
    })

    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
        userRepository.getUserById.mockResolvedValue(undefined)

        await expect(service.execute(1)).rejects.toThrow(NotFoundException)
        expect(userRepository.getUserById).toHaveBeenCalledWith(1)
    })
})