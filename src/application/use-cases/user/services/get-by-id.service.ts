import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { ResponseUserDTO } from '@/presentation/user/dto/user.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

@Injectable()
export default class GetByIdService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: number): Promise<ResponseUserDTO> {
		const user: Users = await this.userRepository.getUserById(id)

		if (!user) {
			throw new NotFoundException('Usuário não encontrado')
		}

		return plainToInstance(ResponseUserDTO, user, {
			excludeExtraneousValues: true,
			enableImplicitConversion: true,
		})
	}
}
