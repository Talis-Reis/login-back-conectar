import { IEnvConfig } from '@/shared/common/infrastructure/interface/env.interface'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ITokenClaims } from '../../../../../presentation/auth/dto/token.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly env: IEnvConfig) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: env.getKeySecret(),
		})
	}

	async validate(payload: ITokenClaims) {
		return payload
	}
}
