import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { MessageType } from '@/shared/common/@types/message.type'
import { comparePassword, createPassword } from '@/shared/utils/password'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'

@Injectable()
export class UpdatePasswordService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		id: number,
		oldPassword: string,
		newPassword: string,
	): Promise<MessageType> {
		const user: Users = await this.userRepository.getUserById(id)

		if (!user) {
			throw new NotFoundException('Usuário não encontrado')
		}

		const password: boolean = await comparePassword(
			oldPassword,
			user.password,
		)

		if (!password) {
			throw new BadRequestException('Senha atual incorreta')
		}

		const newPasswordHash: string = await createPassword(newPassword)

		await this.userRepository.updatePasswordUser(id, newPasswordHash)

		return { message: 'Senha atualizada com sucesso' }
	}
}
