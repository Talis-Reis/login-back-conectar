import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { FilterUserDTO } from '@/presentation/user/dto/user.dto'
import { NotFoundException } from '@nestjs/common'
import { GetAllService } from '../../services/get-all.service'

describe('GetAllService Unit Test', () => {
    let service: GetAllService
    let userRepository: jest.Mocked<IUserRepository>

    beforeEach(() => {
        userRepository = {
            getAllUsers: jest.fn(),
        } as any

        service = new GetAllService(userRepository)
    })

    it('deve retornar usuários paginados corretamente', async () => {
        const filter: FilterUserDTO = { pageIndex: 1, pageSize: 2 }
        const users: Users[] = [
            { id: 1, email: 'a@a.com', firstName: 'A', lastName: 'B', roles: ['admin'], firstAccess: null, lastAccess: null, createdAt: new Date(), updatedAt: new Date(), password: '' },
            { id: 2, email: 'b@b.com', firstName: 'C', lastName: 'D', roles: ['user'], firstAccess: null, lastAccess: null, createdAt: new Date(), updatedAt: new Date(), password: '' },
        ]
        userRepository.getAllUsers.mockResolvedValue([users, 5])

        const result = await service.execute(filter)

        expect(userRepository.getAllUsers).toHaveBeenCalledWith(filter)
        expect(result.users).toBeInstanceOf(Array)
        expect(result.totalItens).toBe(5)
        expect(result.pageIndex).toBe(1)
        expect(result.pageSize).toBe(2)
        expect(result.itemsCount).toBe(3)
    })

    it('deve lançar NotFoundException se nenhum usuário for encontrado', async () => {
        const filter: FilterUserDTO = { pageIndex: 1, pageSize: 2 }
        userRepository.getAllUsers.mockResolvedValue([[], 0])

        await expect(service.execute(filter)).rejects.toThrow(NotFoundException)
    })
})