import { IUserRepository } from '@/application/interfaces/user.inteface'
import { NotFoundException } from '@nestjs/common'
import { DeleteUserService } from '../../services/delete-user.service'

describe('DeleteUserService Unit Test', () => {
    let service: DeleteUserService
    let userRepository: jest.Mocked<IUserRepository>

    beforeEach(() => {
        userRepository = {
            getUserById: jest.fn(),
            deleteUser: jest.fn(),
        } as any

        service = new DeleteUserService(userRepository)
    })

    it('deve remover o usuário com sucesso', async () => {
        const userId = 1
        const user = { id: userId, email: 'test@test.com' } as any
        userRepository.getUserById.mockResolvedValue(user)
        userRepository.deleteUser.mockResolvedValue(undefined)

        const result = await service.execute(userId)

        expect(userRepository.getUserById).toHaveBeenCalledWith(userId)
        expect(userRepository.deleteUser).toHaveBeenCalledWith(userId)
        expect(result).toEqual({ message: 'Usuário removido com sucesso' })
    })

    it('deve lançar NotFoundException se o usuário não existir', async () => {
        const userId = 2
        userRepository.getUserById.mockResolvedValue(undefined)

        await expect(service.execute(userId)).rejects.toThrow(NotFoundException)
        expect(userRepository.getUserById).toHaveBeenCalledWith(userId)
        expect(userRepository.deleteUser).not.toHaveBeenCalled()
    })
})