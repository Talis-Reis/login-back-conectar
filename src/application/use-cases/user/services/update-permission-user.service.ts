import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { UpdatePermissionsUserDTO } from '@/presentation/user/dto/user.dto'
import { MessageType } from '@/shared/common/@types/message.type'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UpdatePermissionUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		id: number,
		permissionUser: UpdatePermissionsUserDTO,
	): Promise<MessageType> {
		const existingUser: Users = await this.userRepository.getUserById(id)

		if (!existingUser) {
			throw new NotFoundException(
				'Problema ao atualizar permissões de usuário: usuário não encontrado.',
			)
		}

		await this.userRepository.updatePermissionUser(id, permissionUser)

		return { message: 'Permissões do usuário atualizadas com sucesso.' }
	}
}
