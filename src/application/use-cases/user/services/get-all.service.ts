import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { ResponseUserDTO } from '@/presentation/user/dto/user.dto'
import { PaginationCommonDTO } from '@/shared/common/presentation/dto/pagination.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class GetAllService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(pagination: PaginationCommonDTO): Promise<{
		users: ResponseUserDTO[]
		totalItens: number
		pageIndex: number
		pageSize: number
		itemsCount: number
	}> {
		pagination.pageIndex = pagination.pageIndex || 1
		pagination.pageSize = pagination.pageSize || 10

		const result: [Users[], number] =
			await this.userRepository.getAllUsers(pagination)

		if (!result || result[0].length === 0) {
			throw new NotFoundException('Nenhum usuário encontrado')
		}

		const listUsers: ResponseUserDTO[] = plainToInstance(
			ResponseUserDTO,
			result[0],
			{
				excludeExtraneousValues: true,
				enableImplicitConversion: true,
			},
		)

		const itemDisplayed = pagination.pageIndex * pagination.pageSize
		const remainingItems = result[1] - itemDisplayed

		return {
			users: listUsers,
			totalItens: result[1],
			pageIndex: pagination.pageIndex,
			pageSize: pagination.pageSize,
			itemsCount: remainingItems > 0 ? remainingItems : 0,
		}
	}
}
