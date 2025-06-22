import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateAccessUserDTO } from '@/presentation/user/dto/user.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateAccessUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		id: number,
		email: string,
		user: UpdateAccessUserDTO,
	): Promise<void> {
		const existingUser: Users =
			await this.userRepository.getUserByEmail(email)

		if (!existingUser) {
			throw new NotFoundException(
				'Problema ao atualizar usuário: usuário não encontrado.',
			)
		}

		await this.userRepository.updateAcessUser(id, user)
	}
}
