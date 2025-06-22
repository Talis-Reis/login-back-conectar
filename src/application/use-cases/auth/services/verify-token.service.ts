import { IAuth } from '@/application/interfaces/auth.interface'
import { ITokenClaims } from '@/presentation/auth/dto/token.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VerifyTokenService {
	constructor(private readonly authService: IAuth) {}

	async execute(token: string): Promise<ITokenClaims> {
		return await this.authService.verifyToken(token)
	}
}
