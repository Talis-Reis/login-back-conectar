import { IUserRepository } from '@/application/interfaces/user.inteface'
import { MessageType } from '@/shared/common/@types/message.type'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: number): Promise<MessageType> {
		const user = await this.userRepository.getUserById(id)

		if (!user) {
			throw new NotFoundException('Usuário não encontrado')
		}

		await this.userRepository.deleteUser(id)

		return {
			message: 'Usuário removido com sucesso',
		}
	}
}
