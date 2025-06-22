import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import {
	FilterUserDTO,
	ResponseUserDTO,
} from '@/presentation/user/dto/user.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class GetAllInactivesService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(filter: FilterUserDTO): Promise<{
		users: ResponseUserDTO[]
		totalItens: number
		pageIndex: number
		pageSize: number
		itemsCount: number
	}> {
		filter.pageIndex = filter.pageIndex || 1
		filter.pageSize = filter.pageSize || 10

		const result: [Users[], number] =
			await this.userRepository.getAllUsersInactives(filter)

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

		const itemDisplayed = filter.pageIndex * filter.pageSize
		const remainingItems = result[1] - itemDisplayed

		return {
			users: listUsers,
			totalItens: result[1],
			pageIndex: filter.pageIndex,
			pageSize: filter.pageSize,
			itemsCount: remainingItems > 0 ? remainingItems : 0,
		}
	}
}
