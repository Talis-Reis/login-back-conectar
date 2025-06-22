import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdateUserDTO } from '@/presentation/user/dto/user.dto'
import { MessageType } from '@/shared/common/@types/message.type'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdateUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: number, user: UpdateUserDTO): Promise<MessageType> {
		const existingUser: Users = await this.userRepository.getUserById(id)

		if (!existingUser) {
			throw new NotFoundException(
				'Problema ao atualizar usuário: usuário não encontrado.',
			)
		}

		if (user.email && user.email !== existingUser.email) {
			const userByEmail: Users = await this.userRepository.getUserByEmail(
				user.email,
			)
			if (userByEmail) {
				throw new NotFoundException(
					'Problema ao atualizar usuário: email já cadastrado.',
				)
			}
		}

		await this.userRepository.updateUser(id, user)

		return {
			message: 'Usuário atualizado com sucesso.',
		}
	}
}
