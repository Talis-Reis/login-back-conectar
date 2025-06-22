import { IAuth } from '@/application/interfaces/auth.interface'
import { Users } from '@/domain/models/users.entity'
import { LoginDTO } from '@/presentation/auth/dto/auth.dto'
import { UpdateAccessUserDTO } from '@/presentation/user/dto/user.dto'
import { comparePassword } from '@/shared/utils/password'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { GetUserByEmailService } from '../../user/services/get-user-by-email.service'
import { UpdateAccessUserService } from '../../user/services/update-access-user.service'

@Injectable()
export class CreateTokenService {
	constructor(
		private readonly authService: IAuth,
		private readonly getUserByEmailService: GetUserByEmailService,
		private readonly updateAccessUserService: UpdateAccessUserService,
	) {}

	async execute(login: LoginDTO): Promise<{ accessToken: string }> {
		const resultUser: Users = await this.getUserByEmailService.execute(
			login.email,
		)

		if (!resultUser)
			throw new UnauthorizedException('Usuário ou senha incorretos.')

		const { id, email }: { id: number; email: string } = resultUser

		const password: boolean = await comparePassword(
			login.password,
			resultUser.password,
		)

		if (!password)
			throw new UnauthorizedException('Usuário ou senha incorretos.')

		const userUpdate = new UpdateAccessUserDTO()

		if (!resultUser.firstAccess) {
			userUpdate.firstAccess = new Date()
		}

		userUpdate.lastAccess = new Date()

		const authorization: string[] = resultUser.roles

		const accessToken: string = await this.authService.createToken({
			jti: randomUUID(),
			sub: id,
			email: email,
			authorization: authorization,
		})

		await this.updateAccessUserService.execute(id, email, userUpdate)

		return { accessToken: accessToken }
	}
}
