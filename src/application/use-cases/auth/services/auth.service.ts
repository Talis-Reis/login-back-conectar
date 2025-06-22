import { IAuth } from '@/application/interfaces/auth.interface'
import { ITokenClaims } from '@/presentation/auth/dto/token.dto'
import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService implements IAuth {
	constructor(
		private readonly jwtService: JwtService,
		private readonly env: IEnvConfig,
	) {}

	async createToken(payload: ITokenClaims): Promise<string> {
		const options = {
			expiresIn: this.env.getExpirationKey(),
		}

		return this.jwtService.sign(payload, options)
	}

	async verifyToken(token: string): Promise<ITokenClaims> {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: this.env.getKeySecret(),
			})
			return decoded
		} catch (error) {
			throw new UnauthorizedException('Não autorizado')
		}
	}
}
