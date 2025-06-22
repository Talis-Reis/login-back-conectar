import { IUserRepository } from '@/application/interfaces/user.inteface'
import { Users } from '@/domain/models/users.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetUserByEmailService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(email: string): Promise<Users> {
		return await this.userRepository.getUserByEmail(email)
	}
}
